//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    title: String,
    mpaa_rating: String,
    director: String,
    release_year: Number,
    genres: Array,
    star_rating: {
        count: 0,
        totalStars: 0,
        lastRating: []
    },
    comments: Array
   });
   //export our module to use in server.js
   module.exports = mongoose.model('Movie', MovieSchema);
   