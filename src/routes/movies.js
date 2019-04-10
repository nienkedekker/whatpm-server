const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.js');
const passport = require('passport');
require('../authentication/passport')(passport);

/**
 * GET all movies
 * ex: host.com/api/movies
 */
router.get('/', (req, res, next) => {
  Movie.find((err, movies) => {
    if (err) return next(err);
    res.json(movies);
  });
});

/**
 * GET a single movie by ID
 * ex: host.com/api/movies/123456
 */
router.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id, (err, movie) => {
    if (err) return next(err);
    res.json(movie);
  });
});

/**
 * GET all movies belonging to a given year
 * ex: host.com/api/movies/year/2017
 */
router.get('/year/:year', (req, res, next) => {
  Movie.find({'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, movies) {
    if (err) return next(err);
    res.json(movies);
  });
});

/**
 * Create a new movie
 * Authenticated requests only
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.create(req.body, (err, movie) => {
      if (err) return next(err);
      res.json(movie);
    });
  },
);

/**
 * Update an existing movie by ID
 * Authenticated requests only
 */
router.put('/:id', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, movie) {
      if (err) return next(err);
      res.json(movie);
    });
  },
);

/**
 * Delete an existing movie by ID
 * Authenticated requests only
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id, req.body, (err, movie) => {
      if (err) return next(err);
      res.json(movie);
    });
  },
);

module.exports = router;
