const express = require('express');
const router = express.Router();
const TVshow = require('../models/TVshow');
const passport = require('passport');
require('../authentication/passport')(passport);

/**
 * GET all TV shows
 * ex: host.com/api/tvshows
 */
router.get('/', (req, res, next) => {
  TVshow.find((err, tvshows) => {
    if (err) return next(err);
    res.json(tvshows);
  });
});

/**
 * GET a single TV show by ID
 * ex: host.com/api/tvshows/123456
 */
router.get('/:id', (req, res, next) => {
  TVshow.findById(req.params.id, (err, tvshow) => {
    if (err) return next(err);
    res.json(tvshow);
  });
});

/**
 * GET all TV shows belonging to a given year
 * ex: host.com/api/tvshows/year/2017
 */
router.get('/year/:year', (req, res, next) => {
  TVshow.find({'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, tvshows) {
    if (err) return next(err);
    res.json(tvshows);
  });
});

/**
 * Create a new TV show
 * Authenticated requests only
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    TVshow.create(req.body, (err, tvshow) => {
      if (err) return next(err);
      res.json(tvshow);
    });
  },
);

/**
 * Update an existing TV show by ID
 * Authenticated requests only
 */
router.put('/:id', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    TVshow.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, tvshow) {
      if (err) return next(err);
      res.json(tvshow);
    });
  },
);

/**
 * Delete an existing TV show by ID
 * Authenticated requests only
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    TVshow.findByIdAndRemove(req.params.id, req.body, (err, tvshow) => {
      if (err) return next(err);
      res.json(tvshow);
    });
  },
);

module.exports = router;
