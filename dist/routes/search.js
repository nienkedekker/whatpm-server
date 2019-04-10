"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const searchByQuery = (req, res, next) => {
    Item.find({ $text: { $search: req.params.query } }).sort('createdAt').find(function (err, items) {
        if (err)
            return next(err);
        res.json(items);
    });
};
router.get('/:query', (req, res, next) => {
    searchByQuery(req, res, next);
});
router.get('/', (res) => {
    res.end();
});
exports.default = router;
