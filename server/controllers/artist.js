const { validationResult } = require("express-validator");
const Artist = require("../models/artist");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const Galleries = require("../models/galleries");
const artist = require("../models/artist");

const createArtist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: "Algo salió mal" });
  }
  try {
    const {
      name,
      lastName,
      coverImage,
      password,
      email,
      photoCarrusel,
      provinces,
    } = req.body;

    const newArtist = await new Artist({
      name,
      coverImage,
      photoCarrusel,
      provinces,
    });
    const newUserArtist = await new User({
      email,
      userName: name,
      name,
      lastName,
      password,
      role: "artist",
    });
    const salt = bcrypt.genSaltSync();
    newUserArtist.password = bcrypt.hashSync(password, salt);
    await newUserArtist.save();
    await newArtist.save();
    return res.status(200).json(`Artist created successfully`);
  } catch (error) {
    console.log(error);
    console.log(errors);
    return res.status(404).json({
      message: "Cannot create Artist",
    });
  }
};

const getArtistAdmin = async (req, res) => {
  try {
    const artists = await Artist.find({});
    return res.status(200).json(artists);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Cannot find Galleries",
    });
  }
};

const getArtistsOrArtist = async (req, res) => {
  try {
    const { nameArtist, provinceToExclude } = req.params;

    let artists = await Artist.find({
      provinces: { $nin: [provinceToExclude] },
    });

    if (nameArtist) {
      artists = artists.filter((artist) => artist.name === nameArtist);
      if (!artists.length) {
        return res.json([
          {
            message: `Por el momento ${nameArtist} no esta disponible para tu region.`,
          },
        ]);
      }
    }
    if (!artists.length) {
      return res.json([
        {
          message:
            "Por el momento no tenemos Artists disponibles para tu region.",
        },
      ]);
    }
    res.status(200).json(artists);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Cannot found any Artist",
    });
  }
};

const editArtist = async (req, res) => {
  const { photoCarrusel, coverImage, name } = req.body;
  const { artistId } = req.params;
  try {
    await Artist.findByIdAndUpdate(artistId, {
      photoCarrusel,
      coverImage,
    });
    res.json({ message: `Artist ${name} edited.` });
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
    });
  }
};

const deleteArtist = async (req, res) => {
  const { name } = req.body;
  try {
    const artist = await Artist.findOneAndDelete({ name });
    const user = await User.findOneAndDelete({ userName: name });
    const galleries = await Galleries.deleteMany({ idArtist: name });
    if (artist && user) {
      return res.status(200).json({
        message: `Artist ${name} deleted succefully!`,
      });
    }
    return res.status(400).json({
      message: "Artist not found!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Cannot delete Artist ${name}`,
      error,
    });
  }
};

const getProvincesArtist = async (req, res) => {
  try {
    const provincesArtist = await Artist.findOne(
      { name: req.userName },
      "provinces"
    );
    res.json(provincesArtist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Cannot found provinces of ${req.userName}`,
      error,
    });
  }
};

const editProvincesArtist = async (req, res) => {
  try {
    const { provinces } = req.body;
    await Artist.findOneAndUpdate(
      { name: req.userName },
      { provinces: provinces },
      { new: true }
    );
    return res.status(200).json({
      message: `Provincias modificadas`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Cannot modificated Artist ${req.userName}`,
      error,
    });
  }
};

module.exports = {
  createArtist,
  getArtistsOrArtist,
  editArtist,
  deleteArtist,
  getProvincesArtist,
  editProvincesArtist,
  getArtistAdmin,
};
