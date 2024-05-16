const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    genreid: {type: Number, required: true},
    genre: {type: String, required: true}
});

module.exports = mongoose.model('Genre', genreSchema);
