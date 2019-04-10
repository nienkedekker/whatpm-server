"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Movie_1 = __importDefault(require("../models/Movie"));
const Book_1 = __importDefault(require("../models/Book"));
const Show_1 = __importDefault(require("../models/Show"));
const async = require('async');
const router = express_1.default.Router();
const getAllitemsByYear = (req, res, next) => {
    async.parallel({
        'allMovies': (cb) => {
            Movie_1.default.find({ 'belongs_to_year': req.params.year }, cb).sort('createdAt');
        },
        'allBooks': (cb) => {
            Book_1.default.find({ 'belongs_to_year': req.params.year }, cb).sort('createdAt');
        },
        'allShows': (cb) => {
            Show_1.default.find({ 'belongs_to_year': req.params.year }, cb).sort('createdAt');
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
