import express from 'express';
import passport from 'passport';
import Book from '../models/Book.js';
require('../authentication/passport')(passport);

const router = express.Router();

/**
 * GET all books
 * ex: host.com/api/books
 */
router.get('/', (req, res, next) => {
  Book.find((err, books) => {
    if (err) return next(err);
    res.json(books);
  });
});

/**
 * GET a single book by ID
 * ex: host.com/api/books/123456
 */
router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id, (err, book) => {
    if (err) return next(err);
    res.json(book);
  });
});

/**
 * GET all books belonging to a given year
 * ex: host.com/api/books/year/2017
 */
router.get('/year/:year', (req, res, next) => {
  Book.find({'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, books) {
    if (err) return next(err);
    res.json(books);
  });
});

/**
 * Create a new book
 * Authenticated requests only
 */
router.post('/', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Book.create(req.body, (err, book) => {
      if (err) return next(err);
      res.json(book);
    });
  },
);

/**
 * Update an existing book by ID
 * Authenticated requests only
 */
router.put('/:id', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, book) => {
      if (err) return next(err);
      res.json(book);
    });
  },
);

/**
 * Delete an existing book by ID
 * Authenticated requests only
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Book.findByIdAndRemove(req.params.id, req.body, (err, book) => {
      if (err) return next(err);
      res.json(book);
    });
  },
);

export default router;
