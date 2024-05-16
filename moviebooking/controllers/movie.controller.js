const Movie = require('../models/movie.model');

// Find all movies by status
const findAllMovies = async (req, res) => {
  try {
    const { status, title, genres, artists, start_date, end_date } = req.query;
    let query = {};
      
    // find by status
    if (status) {
        if (status.toUpperCase() === "PUBLISHED") {
          query.published = true;
        } else if (status.toUpperCase() === "RELEASED") {              query.released = true;
      }
    }
    // find by title
    if (title) {
      query.title = { $regex: `${title}`, $options: "i" };
    }
    // find by genres
    if (genres) {
      const categories = genres.split(",");
      query.genres = { $in: categories };
    }
    // find by artist
    if (artists) {
      total_artists = artists.split(" ");
      total_f = total_artists[0].split(" ");
      total_l = total_artists[1].split(" ");

      query = {
        "artists.first_name": { $in: total_f },
        "artists.last_name": { $in: total_l },
      };
    }
    // find by date
    if (start_date && end_date) {
        query.release_date = {
            $gte: start_date,
            $lte: end_date,
        };
    } else if (start_date) {
        query.release_date = {
            $gte: start_date,
        };
    } else if (end_date) {
        query.release_date = {
            $lte: end_date,
        };
    }

    // console.log(query);
    const movies = await Movie.find(query);

    res.status(200).json({ total: movies.length, movies });
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a movie by its id
const findOne = async (req, res) => {
  try {
    const id = parseInt(req.params.movieid);
    const movie = await Movie.findOne({ movieid: id });
    if (!movie) {
        return res.status(404).json({ message: "movie not found" });
    }

    res.status(200).json([movie]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find shows of a specific movie
const findShows = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie.shows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findAllMovies,
  findOne,
  findShows
};
