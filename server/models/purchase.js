const { Schema, model } = require("mongoose");

const purchase = new Schema(
  {
    paymentId: {
      type: String,
    },
    artistId: {
      type: String,
      required: true,
    },
    galleryId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    galleryName: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    emailUser: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    commission: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("purchase", purchase);
