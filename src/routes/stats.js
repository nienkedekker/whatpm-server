const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');
const Show = require('../models/Show.js');
const Movie = require('../models/Movie.js');
const async = require('async');

/**
* GET amount of items logged by year
* ex: host.com/api/stats/count/:year/{item}
* returns count of items from every year
*/
const getCountOfAllItemsByYear = (req, res, next) => {
  async.parallel({
    movies: cb => Movie.countDocuments({'belongs_to_year': req.params.year }, cb),
    books: cb => Book.countDocuments({'belongs_to_year': req.params.year }, cb),
    shows: cb => Show.countDocuments({'belongs_to_year': req.params.year }, cb),
  }, (err, items) => {
    if (err) return next(err);
    res.json({
      books: items.books,
      movies: items.movies,
      shows: items.shows,
    });
  });
};

/**
 * GET amount of items of all time
 * ex: host.com/api/stats/count/all
 */
const getAllTimeCount = (req, res, next) => {
  async.parallel({
    books: cb => Book.countDocuments({}, cb),
    movies: cb => Movie.countDocuments({}, cb),
    shows: cb => Show.countDocuments({}, cb),
  }, (err, items) => {
    if (err) return next(err);
    res.json({
      books: items.books,
      movies: items.movies,
      shows: items.shows,
    });
  });
};

/**
 * host.com/api/stats/count/all
 */
router.get('/count/all', (req, res, next) => {
  getAllTimeCount(req, res, next);
});

/**
 * host.com/api/stats/count/:year/all
 */
router.get('/count/:year/all', (req, res, next) => {
  getCountOfAllItemsByYear(req, res, next);
});

module.exports = router;
