const express = require('express');
const artistRouter = express.Router();
const artistController = require('../controllers/artist.controller');

// Define routes
artistRouter.get('/', artistController.findAllArtists);

module.exports = artistRouter;
