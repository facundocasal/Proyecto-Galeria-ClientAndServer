const Purchase = require("../models/purchase");
const Galleries = require("../models/galleries");
const mercadopago = require("mercadopago");
const paypal = require("@paypal/checkout-server-sdk");
const User = require("../models/users");
const transporter = require("../util/mailer/mailer");
const mailerNewSale = require("../util/mailer/template/newSaleNotification");
const newSubscription = require("../util/mailer/template/newSubscriptionClient");
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;
//SAND BOX
//let environment = new paypal.core.SandboxEnvironment(clientId,clientSecret);
let environment = new paypal.core.LiveEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// obtener todas las compras

const getPurchases = async (req, res) => {
  try {
    const purchase = await Purchase.find(
      {},
      "artist galleryName price method userName emailUser available commission createdAt -_id"
    );
    res.json(purchase);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot get purchase",
    });
  }
};

// obtener compras usarios o artist

const getUserOrArtistPurchase = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Purchase.find({ userId: userId });
    if (result.length === 0) {
      const result = await Purchase.find({ artistId: userId });
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "algo salio mal" });
  }
};

// obterner por id

const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const respuesta = await Purchase.findById(id);
    res.json(respuesta);
  } catch (error) {
    console.log(error);
    return res.json({ error: "compra no encontrada" });
  }
};

// obtener la galeria y imagenes si el usuario compro esa galeria devuelve todas las imagenes sino devuelve 4
const getGalleryPuchaseUser = async (req, res) => {
  const { userId, galleryName } = req.params;
  try {
    let userRole;
    const galleryId = await Galleries.findOne(
      { galleryName: galleryName },
      "id"
    );
    const userPurchase = await Purchase.findOne({
      userId: userId,
      available: true,
      galleryId: galleryId._id,
    });
    userId != "0"
      ? (userRole = await User.findOne({ _id: userId }, "role"))
      : (userRole = "");
    if (userRole.role === "admin") {
      const galleryPhotos = await Galleries.findOne(
        { galleryName: galleryName },
        "galleryName idArtist photos numberPhotos"
      );
      return res.json(galleryPhotos);
    }
    if (!userPurchase || userId == "undefined") {
      const galleryPhotos = await Galleries.findOne(
        { galleryName: galleryName },
        "photoBlur  photosShow numberPhotos galleryName idArtist price price_USD"
      );
      return res.json(galleryPhotos);
    } else {
      const galleryPhotos = await Galleries.findOne(
        { galleryName: galleryName },
        "galleryName idArtist photos numberPhotos"
      );
      return res.json(galleryPhotos);
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "galeria no encontrada" });
  }
};

// crear compra mercadoPago

const createPaymentmercado = async (req, res) => {
  const { id } = req.body.data;
  try {
    const existingPurchase = await Purchase.findOne({ paymentId: id });
    if (existingPurchase) {
      return res.status(200).send("ok");
    }
    const compra = await mercadopago.payment.findById(id);
    const { status, status_detail } = compra.body;
    if (status === "approved" && status_detail === "accredited") {
      const { user_name, user_id } = compra.body.metadata;
      const { fee_details } = compra.body;
      const totalCommission = fee_details[0].amount;
      const { transaction_amount } = compra.response;
      const commissionRate = (
        (totalCommission / transaction_amount) *
        100
      ).toFixed(2);
      const { items } = compra.response.additional_info;
      items.forEach(async (element) => {
        const artist = element.description;
        const galleryName = element.title;
        const price = element.unit_price;
        const commission = ((commissionRate * price) / 100).toFixed(2);
        const artistId = await User.findOne({ userName: artist }, "id");
        const galleryId = await Galleries.findOne({ galleryName }, "id");
        const userEmail = await User.findOne({ userName: user_name }, "email");
        const newPurchase = {
          paymentId: id,
          artistId: artistId._id,
          galleryId: galleryId._id,
          userId: user_id,
          userName: user_name,
          galleryName,
          artist,
          price,
          method: "mercado Pago",
          emailUser: userEmail.email,
          available: true,
          commission,
        };
        const response = await Purchase.create(newPurchase);
        await transporter.sendMail({
          from: process.env.USER_MAILER,
          to: process.env.USER_MAILER,
          subject: "Notificación de nueva venta 🎉",
          text: "Notificación de nueva venta 🎉",
          html: mailerNewSale(
            user_name,
            galleryName,
            artist,
            "Mercado Pago",
            price
          ),
        });
        await transporter.sendMail({
          from: process.env.USER_MAILER,
          to: userEmail.email,
          subject: "Confirmación de Suscripción ",
          text: "Confirmación de Suscripción ",
          html: newSubscription(user_name, galleryName),
        });
      });
      return res.status(200).send("ok");
    } else {
      return res.status(200).send("ok");
    }
  } catch (error) {
    console.log(error);
    console.log(id);
    return res.json({ error: "guardado en la base compra MP " });
  }
};

// crear compra paypal

const createPaymentpaypal = async (req, res) => {
  const { id, artist } = req.body;
  const artistId = await User.findOne({ userName: artist }, "id");
  try {
    const paymentRequest = new paypal.orders.OrdersCaptureRequest(id);
    await client.execute(paymentRequest);
    const infoRequest = new paypal.orders.OrdersGetRequest(id);
    const infoOrder = await client.execute(infoRequest);
    if (infoOrder.result.status !== "COMPLETED") {
      return res.status(400).json({
        error,
      });
    }
    const galleriesOrder = infoOrder.result.purchase_units;
    galleriesOrder.forEach(async (gallery, i) => {
      const newPurchase = {
        paymentId: id,
        artistId: artistId._id,
        galleryId: gallery.reference_id,
        userId: req.userId,
        userName: req.userName,
        galleryName: gallery.description,
        artist: artist,
        price: gallery.amount.value,
        available: true,
        method: "PayPal",
        emailUser: req.userEmail,
        commission:
          infoOrder.result.purchase_units[i].payments.captures[0]
            .seller_receivable_breakdown.paypal_fee.value,
      };
      const response = await Purchase.create(newPurchase);
      await transporter.sendMail({
        from: process.env.USER_MAILER,
        to: process.env.USER_MAILER,
        subject: "Notificación de nueva venta 🎉",
        text: "Notificación de nueva venta 🎉",
        html: mailerNewSale(
          req.userName,
          gallery.description,
          artist,
          "Pay Pal",
          gallery.amount.value
        ),
      });
      await transporter.sendMail({
        from: process.env.USER_MAILER,
        to: req.userEmail,
        subject: "Confirmación de Suscripción ",
        text: "Confirmación de Suscripción ",
        html: newSubscription(req.userName, gallery.description),
      });
    });
    return res.status(201).json({
      response: "todo ok",
    });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    console.log(req.userId);
    return res.status(400).json({
      error,
    });
  }
};

const paypalOrder = async (req, res) => {
  try {
    const { data } = req.body;
    const soli = new paypal.orders.OrdersCreateRequest();
    let purchase_units;
    const gallery = await Galleries.findOne(
      { galleryName: data },
      "galleryName price_USD id idArtist"
    );

    if (!gallery) {
      const galleries = await Galleries.find(
        {
          idArtist: data,
          _id: {
            $nin: (
              await Purchase.find({ userId: req.userId, available: true })
            ).map((compra) => compra.galleryId),
          },
        },
        "galleryName price_USD id idArtist"
      );
      purchase_units = galleries.map((gallery) => {
        return {
          reference_id: gallery._id,
          amount: {
            currency_code: "USD",
            value: `${gallery.price_USD}.00`,
          },
          description: gallery.galleryName,
          custom_id: gallery.galleryName,
        };
      });
    } else {
      purchase_units = [
        {
          reference_id: gallery._id,
          amount: {
            currency_code: "USD",
            value: `${gallery.price_USD}.00`,
          },
          description: gallery.galleryName,
          custom_id: gallery.galleryName,
        },
      ];
    }
    soli.requestBody({
      intent: "CAPTURE",
      purchase_units,
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
    const respo = await client.execute(soli);
    return res.json({ id: respo.result.id, links: respo.result.links[1] });
  } catch (error) {
    console.log(error);
    console.log(req.body);
    return res.json({ error: "error al crear pago en PAYPAL" });
  }
};

module.exports = {
  getPurchases,
  createPaymentmercado,
  getGalleryPuchaseUser,
  createPaymentpaypal,
  paypalOrder,
  getPurchaseById,
  getUserOrArtistPurchase,
};
