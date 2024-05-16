const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// Define routes
router.get('/:movieid/shows', movieController.findShows);
router.get('/:movieid', movieController.findOne);
router.get('/', movieController.findAllMovies);

module.exports = router;
