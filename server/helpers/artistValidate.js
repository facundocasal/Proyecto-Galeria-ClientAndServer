const Artist = require("../models/artist");

const validateArtist = async (name) => {
  const isName = await Artist.findOne({
    name: { $regex: name, $options: "i" },
  });

  if (isName) {
    return res.status(401).json({
      email: { message: `${name} ya se encuentra registrada`, status: 401 },
    });
  }
};

module.exports = { validateArtist };
