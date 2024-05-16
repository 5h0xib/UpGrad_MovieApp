const Artists = require('../models/artist.model');

// Find all artists
const findAllArtists = async (req, res) => {
  try {
    const artists = await Artists.find();
    res.status(200).json({ artists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllArtists
};
