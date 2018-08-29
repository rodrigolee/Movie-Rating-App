const Movie = require('../models/movies')

module.exports = {
    async getMovies (req, res, next) {
      try {
        let movies = await Movie.find({})
        return res.json(movies);
      } catch (err) {
        res.status(500).json({
            error: err
        })
      }
    },
    async getMovieGenres (req, res, next) {
      try {
        let movies = await Movie.find({})
        let genres = []
        for (let i = 0; i < movies.length; i++) {
          for(let j = 0; j < movies[i].genres.length; j++) {
            if(!genres.includes(movies[i].genres[j])) {
                genres.push(movies[i].genres[j])
            }
          }
        }
      return res.json(genres)
      } catch (err) {
        res.status(500).json({
          error: err
        })
      }
    },
    async getMovieYears (req, res, next) {
      try {
        let movies = await Movie.find({})
        let years = []
        for (let i = 0; i < movies.length; i++) {
          if(!years.includes(movies[i].release_year)) {
            years.push(movies[i].release_year)
          }
        }
      return res.json(years)
      } catch (err) {
        res.status(500).json({
          error: err
        })
      }
    },
    async getMovieRatings (req, res, next) {
      try {
        let movies = await Movie.find({})
        let ratings = []
        for (let i = 0; i < movies.length; i++) {
          if(!ratings.includes(movies[i].mpaa_rating)) {
            ratings.push(movies[i].mpaa_rating)
          }
        }
      return res.json(ratings)
      } catch (err) {
        res.status(500).json({
          error: err
        })
      }
    },
    async postComment (req, res, next) {
      const movieId = req.params.movieId
      try {
        let movie = await Movie.findById(movieId)
        let comment = req.body.comment
        movie.comments.push(comment)
        movie.save()
      } catch(err) {
        res.status(500).json({
          error: err
        })
      }
    },
    async postStarRating (req, res, next) {
      const movieId = req.params.movieId
      try {
        let movie = await Movie.findById(movieId)
        let starRating = req.body.starRating
        movie.star_rating.lastRating.push(starRating)
        movie.star_rating.totalStars += parseInt(starRating)
        movie.star_rating.count++
        console.log(movie.star_rating.totalStars)
        console.log(movie.star_rating.count)
        movie.save()
      } catch(err) {
        res.status(500).json({
          error: err
        })
      }
    }
}