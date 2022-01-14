// TODO: fix linting errors
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import express from 'express';
import passport from 'passport';
import Show from '../models/Show';

require('../authentication/passport')(passport);

const router = express.Router();

/**
 * GET all TV shows
 * ex: host.com/api/tvshows
 */
router.get('/', (req, res, next) => {
  Show.find((err, shows) => {
    if (err) return next(err);
    res.json(shows);
  });
});

/**
 * GET a single TV show by ID
 * ex: host.com/api/tvshows/123456
 */
router.get('/:id', (req, res, next) => {
  Show.findById(req.params.id, (err, show) => {
    if (err) return next(err);
    res.json(show);
  });
});

/**
 * GET all TV shows belonging to a given year
 * ex: host.com/api/tvshows/year/2017
 */
router.get('/year/:year', (req, res, next) => {
  Show.find({ belongs_to_year: req.params.year }).sort('createdAt').find((err, shows) => {
    if (err) return next(err);
    res.json(shows);
  });
});

/**
 * Create a new TV show
 * Authenticated requests only
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Show.create(req.body, (err, show) => {
      if (err) return next(err);
      res.json(show);
    });
  },
);

/**
 * Update an existing TV show by ID
 * Authenticated requests only
 */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Show.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, show) => {
      if (err) return next(err);
      res.json(show);
    });
  },
);

/**
 * Delete an existing TV show by ID
 * Authenticated requests only
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Show.findByIdAndRemove(req.params.id, req.body, (err, show) => {
      if (err) return next(err);
      res.json(show);
    });
  },
);

export default router;
