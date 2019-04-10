"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
const passport = require('passport');
require('../authentication/passport')(passport);
router.get('/', (req, res, next) => {
    Show.find((err, shows) => {
        if (err)
            return next(err);
        res.json(shows);
    });
});
router.get('/:id', (req, res, next) => {
    Show.findById(req.params.id, (err, show) => {
        if (err)
            return next(err);
        res.json(show);
    });
});
router.get('/year/:year', (req, res, next) => {
    Show.find({ 'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, shows) {
        if (err)
            return next(err);
        res.json(shows);
    });
});
router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Show.create(req.body, (err, show) => {
        if (err)
            return next(err);
        res.json(show);
    });
});
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Show.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function (err, show) {
        if (err)
            return next(err);
        res.json(show);
    });
});
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Show.findByIdAndRemove(req.params.id, req.body, (err, show) => {
        if (err)
            return next(err);
        res.json(show);
    });
});
exports.default = router;
