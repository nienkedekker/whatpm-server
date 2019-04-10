const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const passport = require('passport');
require('../authentication/passport')(passport);

/**
 * GET all movies
 * ex: host.com/api/movies
 */
router.get('/', (req: Express.Request, res: any, next: any) => {
  Movie.find((err: any, movies: any) => {
    if (err) return next(err);
    res.json(movies);
  });
});

/**
 * GET a single movie by ID
 * ex: host.com/api/movies/123456
 */
router.get('/:id', (req: { params: { id: number; }; }, res: any, next: any) => {
  Movie.findById(req.params.id, (err: any, movie: any) => {
    if (err) return next(err);
    res.json(movie);
  });
});

/**
 * GET all movies belonging to a given year
 * ex: host.com/api/movies/year/2017
 */
router.get('/year/:year', (req: { params: { year: number; }; }, res: { json: any }, next: any) => {
  Movie.find({'belongs_to_year': req.params.year }).sort('createdAt').find(function (err: any, movies: any) {
    if (err) return next(err);
    res.json(movies);
  });
});

/**
 * Create a new movie
 * Authenticated requests only
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  (req: { body: any; }, res: { json: any }, next: any) => {
    Movie.create(req.body, (err: any, movie: any) => {
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
  (req: { params: { id: any; }; body: any; }, res: { json: any }, next: any) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err: any, movie: any) {
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
  (req: { params: { id: any; }; body: any; }, res: { json: any }, next: any) => {
    Movie.findByIdAndRemove(req.params.id, req.body, (err: any, movie: any) => {
      if (err) return next(err);
      res.json(movie);
    });
  },
);

export default router;
