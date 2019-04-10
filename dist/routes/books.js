"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Book_js_1 = __importDefault(require("../models/Book.js"));
const passport_1 = __importDefault(require("passport"));
require('../authentication/passport')(passport_1.default);
router.get('/', (req, res, next) => {
    Book_js_1.default.find((err, books) => {
        if (err)
            return next(err);
        res.json(books);
    });
});
router.get('/:id', (req, res, next) => {
    Book_js_1.default.findById(req.params.id, (err, book) => {
        if (err)
            return next(err);
        res.json(book);
    });
});
router.get('/year/:year', (req, res, next) => {
    Book_js_1.default.find({ 'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, books) {
        if (err)
            return next(err);
        res.json(books);
    });
});
router.post('/', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    Book_js_1.default.create(req.body, (err, book) => {
        if (err)
            return next(err);
        res.json(book);
    });
});
router.put('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    Book_js_1.default.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, (err, book) => {
        if (err)
            return next(err);
        res.json(book);
    });
});
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    Book_js_1.default.findByIdAndRemove(req.params.id, req.body, (err, book) => {
        if (err)
            return next(err);
        res.json(book);
    });
});
exports.default = router;
