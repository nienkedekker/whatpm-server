// TODO: fix linting errors
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable quote-props */

import express from "express";
import async from "async";

import Book from "../models/Book";
import Show from "../models/Show";
import Movie from "../models/Movie";

const router = express.Router();

/**
 * GET all items by year
 * ex: host.com/api/years/year/2017
 * returns all books, movies and tv shows from that year
 * cb (callback) is required for async pkg
 */
const getAllitemsByYear = (req, res, next) => {
  async.parallel(
    {
      allMovies: (cb) => {
        Movie.find({ belongs_to_year: req.params.year }, cb).sort("createdAt");
      },
      allBooks: (cb) => {
        Book.find({ belongs_to_year: req.params.year }, cb).sort("createdAt");
      },
      allShows: (cb) => {
        Show.find({ belongs_to_year: req.params.year }, cb).sort("createdAt");
      },
    },
    (err, allItems) => {
      if (err) return next(err);
      res.json(allItems);
    }
  );
};

router.get("/year/:year", (req, res, next) => {
  getAllitemsByYear(req, res, next);
});

export default router;
