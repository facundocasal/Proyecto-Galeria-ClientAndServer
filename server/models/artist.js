const { Schema, model } = require("mongoose");

const artist = new Schema({
  name: String,
  coverImage: String,
  photoCarrusel: String,
  provinces: {
    type: [String],
    default: [],
  },
});

module.exports = model("Artist", artist);
