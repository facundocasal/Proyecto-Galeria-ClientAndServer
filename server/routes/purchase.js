const { Router } = require("express");
const route = Router();
const { jwtValidator } = require("../middleware/jwt");
const {
  getPurchases,
  getUserOrArtistPurchase,
  createPaymentmercado,
  getGalleryPuchaseUser,
  createPaymentpaypal,
  paypalOrder,
  getPurchaseById,
} = require("../controllers/purchase");
const { isAdmin } = require("../middleware/isAdmin");

const Purchase = require("../models/purchase");

route
  .get("/", isAdmin, getPurchases)
  .get("/user/:userId/:galleryName", getGalleryPuchaseUser)
  .get("/id/:id", isAdmin, getPurchaseById)
  .get("/:userId", jwtValidator, getUserOrArtistPurchase)
  .post("/paypalIpn", jwtValidator, createPaymentpaypal)
  .post("/ipn", createPaymentmercado)
  .post("/paypal", jwtValidator, paypalOrder)
  .post("/pruebaMP", (req, res) => {
    res.status(200).send("ok");
  });
module.exports = route;
