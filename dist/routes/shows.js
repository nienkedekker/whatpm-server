"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Show_1 = __importDefault(require("../models/Show"));
const passport_1 = __importDefault(require("passport"));
require('../authentication/passport')(passport_1.default);
const router = express_1.default.Router();
router.get('/', (res, next) => {
    Show_1.default.find((err, shows) => {
        if (err)
            return next(err);
        res.json(shows);
    });
});
router.get('/:id', (req, res, next) => {
    Show_1.default.findById(req.params.id, (err, show) => {
        if (err)
            return next(err);
        res.json(show);
    });
});
router.get('/year/:year', (req, res, next) => {
    Show_1.default.find({ 'belongs_to_year': req.params.year }).sort('createdAt').find(function (err, shows) {
        if (err)
            return next(err);
        res.json(shows);
    });
});
router.post('/', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    Show_1.default.create(req.body, (err, show) => {
        if (err)
            return next(err);
        res.json(show);
    });
});
router.put('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    Show_1.default.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function (err, show) {
        if (err)
            return next(err);
        res.json(show);
    });
});
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res, next) => {
    Show_1.default.findByIdAndRemove(req.params.id, req.body, (err, show) => {
        if (err)
            return next(err);
        res.json(show);
    });
});
exports.default = router;
