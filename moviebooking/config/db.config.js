const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/moviesdb';

const db = {};
db.mongoose = mongoose;
db.url = url;
db.models = require('../models');

module.exports = db;