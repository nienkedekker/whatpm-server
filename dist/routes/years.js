"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie.js');
const Book = require('../models/Book.js');
const Show = require('../models/Show.js');
const async = require('async');
const getAllitemsByYear = (req, res, next) => {
    async.parallel({
        'allMovies': (cb) => {
            Movie.find({ 'belongs_to_year': req.params.year }, cb).sort('createdAt');
        },
        'allBooks': (cb) => {
            Book.find({ 'belongs_to_year': req.params.year }, cb).sort('createdAt');
        },
        'allShows': (cb) => {
            Show.find({ 'belongs_to_year': req.params.year }, cb).sort('createdAt');
        },
    }, (err, allItems) => {
        if (err)
            return next(err);
        res.json(allItems);
    });
};
router.get('/year/:year', (req, res, next) => {
    getAllitemsByYear(req, res, next);
});
exports.default = router;
