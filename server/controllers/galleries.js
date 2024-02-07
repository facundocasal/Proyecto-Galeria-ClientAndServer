const { validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../models/galleries");
const Galleries = require("../models/galleries");
const Artist = require("../models/artist");
const Purchase = require("../models/purchase");

// obtener todas las galerias
const getGalleries = async (req, res) => {
  try {
    const provinceToExclude = req.params.province;
    const artists = await Artist.find(
      {
        provinces: { $nin: [provinceToExclude] },
      },
      "name"
    );
    const galleries = await Galleries.find(
      {
        idArtist: { $in: artists.map((q) => q.name) },
      },
      "coverPhotoGallery idArtist galleryName numberPhotos price_USD price _id"
    );
    res.json(galleries);
  } catch (error) {
    console.log(error);
    return res.json([
      {
        message: "Por el momento no hay galerias disponibles en tu region.",
      },
    ]);
  }
};

// obtener las galerias para admin

const getAdminGalleries = async (req, res) => {
  try {
    const galleries = await Galleries.find({});
    res.status(200).json(galleries);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Cannot find Galleries",
    });
  }
};

// obtener galerias por id
const getGallerieById = async (req, res) => {
  const { id } = req.params;
  try {
    const galleries = await Galleries.findById(
      id,
      "coverPhotoGallery idArtist galleryName numberPhotos price_USD price"
    );
    res.json(galleries);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Cannot find Gallery",
    });
  }
};

// galerias por artist
const getGallerieByArtist = async (req, res) => {
  const { nameArtist, provinceToExclude } = req.params;

  try {
    if (nameArtist == "undefined") {
      return;
    }
    const artist = await Artist.findOne(
      {
        name: nameArtist,
        provinces: { $nin: [provinceToExclude] },
      },
      "name"
    );
    const artistGalleries = await Galleries.find(
      { idArtist: artist.name },
      "coverPhotoGallery idArtist galleryName numberPhotos price_USD price"
    );
    res.json(artistGalleries);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: `Por el momento ${nameArtist} no tiene galerias disponible en tu region.`,
    });
  }
};

// galerias por nombre Galeria
const getGallerieBygalleryName = async (req, res) => {
  const { nameArtist, galleryName, provinceToExclude } = req.params;
  try {
    const artist = await Artist.findOne(
      {
        name: nameArtist,
        provinces: { $nin: [provinceToExclude] },
      },
      "name"
    );
    const galleries = await Galleries.find(
      { idArtist: artist.name, galleryName: galleryName },
      "coverPhotoGallery idArtist galleryName numberPhotos "
    );
    res.json(galleries);
  } catch (error) {
    return res.status(404).json([
      {
        message: `Por el momento ${galleryName} de ${nameArtist} no esta disponible en tu region.`,
      },
    ]);
  }
};

// crear gallerias
const createGalleries = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Algo salió mal" });
  }
  const {
    idArtist,
    photosShow,
    photoBlur,
    galleryName,
    price,
    price_USD,
    coverPhotoGallery,
    photos,
  } = req.body;
  try {
    const newGallery = await new Galleries({
      idArtist,
      galleryName,
      coverPhotoGallery,
      photosShow,
      photoBlur,
      price,
      price_USD,
      photos,
      numberPhotos: photos.length,
    });

    await newGallery.save();
    res.json(`Gallery created successfully`);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Cannot create Gallery",
    });
  }
};

// modificar galeria
const updateGallerie = async (req, res) => {
  const {
    _id,
    galleryName,
    price,
    price_USD,
    photoBlur,
    coverPhotoGallery,
    photosShow,
  } = req.body;
  try {
    await Galleries.findByIdAndUpdate(_id, {
      galleryName,
      price,
      price_USD,
      photoBlur,
      coverPhotoGallery,
      photosShow,
    });
    await Purchase.updateMany(
      { galleryId: _id },
      { $set: { galleryName: galleryName } }
    );
    res.json({ message: "Gallery updated" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Cannot update Gallery",
    });
  }
};

// borrar galeria
const deleteGallerie = async (req, res) => {
  const { id } = req.params;
  try {
    await Galleries.findByIdAndDelete(id);
    return res.status(200).json({
      message: `Gallery deleted succefully!`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot delete Gallery",
    });
  }
};

module.exports = {
  createGalleries,
  getGallerieById,
  getAdminGalleries,
  getGallerieByArtist,
  getGalleries,
  getGallerieBygalleryName,
  deleteGallerie,
  updateGallerie,
};
