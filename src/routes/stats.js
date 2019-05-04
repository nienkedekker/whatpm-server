const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');
const Show = require('../models/Show.js');
const Movie = require('../models/Movie.js');

/**
 * GET amount of items ever logged
 * ex: host.com/api/stats/{item}
 * returns count of items from every year
 */
const getAllTimeCount = (model, req, res, next) => {
  model.countDocuments((err, count) => {
    if (err) return next(err);
    res.json(count);
  });
};

/**
 * GET amount of items logged by year
 * ex: host.com/api/stats/count/:year/{item}
 * returns count of items from every year
 */
const getCountByYear = (model, req, res, next) => {
  model.countDocuments({'belongs_to_year': req.params.year }, (err, itemCount) => {
    if (err) return next(err);
    res.json(itemCount);
  });
};

/**
 * host.com/api/stats/count/:year/movies
 */
router.get('/count/:year/movies', (req, res, next) => {
  getCountByYear(Movie, req, res, next);
});

/**
 * host.com/api/stats/count/:year/books
 */
router.get('/count/:year/books', (req, res, next) => {
  getCountByYear(Book, req, res, next);
});

/**
 * host.com/api/stats/count/:year/shows
 */
router.get('/count/:year/shows', (req, res, next) => {
  getCountByYear(Show, req, res, next);
});

/**
 * host.com/api/stats/count/books
 */
router.get('/count/books', (res, next) => {
  getAllTimeCount(Book, res, next);
});

/**
 * host.com/api/stats/count/shows
 */
router.get('/count/shows', (res, next) => {
  getAllTimeCount(Show, res, next);
});

/**
 * host.com/api/stats/count/movies
 */
router.get('/count/movies', (res, next) => {
  getAllTimeCount(Movie, res, next);
});

module.exports = router;
