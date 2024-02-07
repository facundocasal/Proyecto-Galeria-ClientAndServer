const mercadopago = require("mercadopago");
const Purchase = require("../models/purchase");
const Galleries = require("../models/galleries");
const moment = require("moment-timezone");
require("dotenv").config();

mercadopago.configure({
  // access_token: process.env.ACCESS_TOKEN,
  access_token: process.env.TEST_TOKEN,
});

class MercadoPago {
  createPay = async (req, res) => {
    const { galleryName, artist } = req.body;
    const dateNow = moment();
    const dateExpires = dateNow
      .clone()
      .add(15, "minutes")
      .format("YYYY-MM-DDTHH:mm:ssZ");
    let items, success;
    if (galleryName) {
      const { price, idArtist } = await Galleries.findOne(
        { galleryName },
        " price idArtist -_id"
      );
      items = [
        {
          title: galleryName,
          description: idArtist,
          category_id: "Gallery",
          quantity: 1,
          unit_price: Number(price),
        },
      ];
      success = `${process.env.URL}/gallery/${galleryName}`;
    }
    if (artist) {
      const galerias = await Galleries.find(
        {
          idArtist: artist,
          _id: {
            $nin: (
              await Purchase.find({ userId: req.userId, available: true })
            ).map((compra) => compra.galleryId),
          },
        },
        "galleryName price coverPhotoGallery -_id "
      );
      items = galerias.map(({ galleryName, price, coverPhotoGallery }) => {
        return {
          title: galleryName,
          description: artist,
          picture_url: coverPhotoGallery,
          category_id: "Gallery",
          quantity: 1,
          unit_price: Number(price),
        };
      });
      success = `${process.env.URL}/galleries/${artist}`;
    }
    let preference = {
      payer: {
        email: req.userEmail,
      },
      expires: true,
      date_of_expiration: dateExpires,
      preference_id: " ",
      items: items,
      metadata: {
        userId: req.userId,
        userName: req.userName,
      },
      back_urls: {
        success: success,
      },
      auto_return: "approved",
    };
    mercadopago.preferences
      .create(preference)
      .then(async (response) => {
        res.json({
          mpLink: response.body.init_point,
          preferenseId: response.body.id,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json(err);
      });
  };
}

module.exports = MercadoPago;
