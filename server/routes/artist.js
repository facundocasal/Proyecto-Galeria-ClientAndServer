const { Router } = require("express");
const route = Router();
const { body } = require("express-validator");
const {
  createArtist,
  getArtistsOrArtist,
  deleteArtist,
  editArtist,
  getProvincesArtist,
  editProvincesArtist,
  getArtistAdmin,
} = require("../controllers/artist");
const { validateArtist } = require("../helpers/artistValidate");
const { isAdmin } = require("../middleware/isAdmin");
const {
  validateEmail,
  validateUserName,
  validateName,
} = require("../helpers/validation");
const { jwtValidator } = require("../middleware/jwt");

//
route.get("/admin", isAdmin, getArtistAdmin);

route.get("/getProvincesArtist", jwtValidator, getProvincesArtist);

route.get("/:provinceToExclude/:nameArtist?", getArtistsOrArtist);

route.post(
  "/",
  body("name")
    .trim()
    .escape()
    .isAlpha("es-ES", { ignore: " " })
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 30 }),
  body("name").custom(validateArtist),
  body("lastName").trim().escape().isAlpha("es-ES", { ignore: " " }),
  body("coverImage"),
  body("[provinces]"),
  body("password").not().isEmpty().isStrongPassword({ minSymbols: 0 }),
  body("email").trim().escape().isEmail().not().isEmpty(),
  validateEmail,
  validateUserName,
  validateName,
  isAdmin,
  createArtist
);

route.post("/editProvinces/", jwtValidator, editProvincesArtist);

route.post("/:artistId", isAdmin, editArtist);

route.delete("/", isAdmin, deleteArtist);

module.exports = route;
