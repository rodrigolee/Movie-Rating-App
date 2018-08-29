//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MovieController = require('./controllers/MovieController');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;
//db config
mongoose.connect('mongodb://127.0.0.1/config', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
//Use our router configuration when we call
// Routes
app.use('/', router);
//Getting all Movies
router.get('/movies',
  (req, res, next) => {
    MovieController.getMovies(req, res, next)
  }
)
//Getting Genres
router.get('/movies/genres',
  (req, res, next) => {
    MovieController.getMovieGenres(req, res, next)
  }
)
//Getting Years
router.get('/movies/years',
  (req, res, next) => {
    MovieController.getMovieYears(req, res, next)
  }
)
//Getting Ratings
router.get('/movies/ratings',
  (req, res, next) => {
    MovieController.getMovieRatings(req, res, next)
  }
)
//Posting Comments to Individual Movie
router.post('/movies/:movieId/comments', 
  (req, res, next) => {
    MovieController.postComment(req, res, next)
  }
)
//Post Star Rating
router.post('/movies/:movieId/starrating',
  (req, res, next) => {
    MovieController.postStarRating(req, res, next)
  }
)
//Use our router configuration when we call /api
//...
//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});