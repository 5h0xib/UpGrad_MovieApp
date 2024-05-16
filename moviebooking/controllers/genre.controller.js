const Genres = require('../models/genre.model');

// Find all genres
const findAllGenres = async (req, res) => {
  try {
    const genres = await Genres.find();
    res.status(200).json({ genres });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  findAllGenres
};
