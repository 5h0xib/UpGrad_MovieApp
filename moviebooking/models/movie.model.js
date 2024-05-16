const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieid: {type: Number,required: true,},
    title: {type: String, required: true},
    published: {type: Boolean},
    released: {type: Boolean},
    poster_url: {type: String},
    release_date: {type: String},
    publish_date: {type: String},
    artists: [{
        artistid: {type: String},
        first_name: {type: String},
        last_name: {type: String},
        wiki_url: {type: String},
        profile_url: {ype: String},
        movies: [],
      }
    ],
    genres: [],
    duration: {type: Number},
    critic_rating: {type: Number},
    trailer_url: {type: String},
    wiki_url: {type: String},
    story_line: {type: String},
    shows: []
  });

module.exports = mongoose.model('Movie', movieSchema);

