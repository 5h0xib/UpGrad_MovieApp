const express = require('express');
const genreRouter = express.Router();
const genreController = require('../controllers/genre.controller');

// Define routes
genreRouter.get('/', genreController.findAllGenres);

module.exports = genreRouter;
