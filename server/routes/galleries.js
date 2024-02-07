const { Router } = require("express");
const route = Router();
const { jwtValidator } = require("../middleware/jwt");
const { body } = require("express-validator");
const {
  createGalleries,
  getGallerieById,
  getGalleries,
  getGallerieByArtist,
  getGallerieBygalleryName,
  deleteGallerie,
  updateGallerie,
  getAdminGalleries,
} = require("../controllers/galleries");
const Galleries = require("../models/galleries");
const { validateGalleries } = require("../helpers/galleriesValidate");
const { isAdmin } = require("../middleware/isAdmin");

route
  // obtener las galerias para el admin
  .get("/admin", isAdmin, getAdminGalleries)
  // galleries by ID
  .get("/id/:id", getGallerieById)
  // galleries by artist
  .get("/artist/:nameArtist/:provinceToExclude", getGallerieByArtist)
  // obtener todas las galerias
  .get("/:province", getGalleries)
  // galleries by name
  .get("/:provinceToExclude/:galleryName/:nameArtist", getGallerieBygalleryName)
  // crear galeria
  .post(
    "/",
    body("idArtist"),
    body("galleryName")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 30 }),
    body("galleryName").custom(validateGalleries),
    body("coverPhotoGallery"),
    body("[photosShow]"),
    body("photoBlur"),
    body("price").trim().escape().isNumeric().isLength({ min: 2, max: 6 }),
    body("price_USD").trim().escape().isNumeric().isLength({ min: 1, max: 6 }),
    body("[photos]"),
    isAdmin,
    createGalleries
  )

  .post("/updateGallerie", isAdmin, updateGallerie)
  // borrar galeria por id
  .delete("/delete/:id", isAdmin, deleteGallerie);

module.exports = route;
