"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const passport = require('passport');
require('../authentication/passport')(passport);
router.get('/', (req, res, next) => {
    Movie.find((err, movies) => {
        if (err)
            return next(err);
        res.json(movies);
    });
});
router.get('/:id', (req, res, next) => {
    Movie.findById(req.params.id, (err, movie) => {
        if (err)
            return next(err);
        res.json(movie);
    });
});
router.get('/year/:year', (req, res, next) => {
    Movie.find({ 'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, movies) {
        if (err)
            return next(err);
        res.json(movies);
    });
});
router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Movie.create(req.body, (err, movie) => {
        if (err)
            return next(err);
        res.json(movie);
    });
});
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function (err, movie) {
        if (err)
            return next(err);
        res.json(movie);
    });
});
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id, req.body, (err, movie) => {
        if (err)
            return next(err);
        res.json(movie);
    });
});
exports.default = router;
