import express from 'express';
import Movie from '../models/Movie';
import Book from '../models/Book';
import Show from '../models/Show';

const async = require('async');
const router = express.Router();

/**
 * GET all items by year
 * ex: host.com/api/years/year/2017
 * returns all books, movies and tv shows from that year
 * cb (callback) is required for async pkg
 */
const getAllitemsByYear = (req: { params: { year: any; }; }, res: { json: (arg0: any) => void; }, next: (arg0: any) => void) =>  {
  async.parallel({
    'allMovies': (cb: any) => {
      Movie.find({'belongs_to_year': req.params.year }, cb).sort('createdAt');
    },
    'allBooks': (cb: any) => {
      Book.find({'belongs_to_year': req.params.year }, cb).sort('createdAt');
    },
    'allShows': (cb: any) => {
      Show.find({'belongs_to_year': req.params.year }, cb).sort('createdAt');
    },
  },
  (err: any, allItems: any) => {
    if (err) return next(err);
    res.json(allItems);
  });
};

router.get('/year/:year', (req: { params: { year: any; }; }, res: { json: (arg0: any) => void; }, next: (arg0: any) => void) => {
  getAllitemsByYear(req, res, next);
});

export default router;
