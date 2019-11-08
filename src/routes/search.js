import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

const searchByQuery = (req, res, next) =>  {
  Item.find({$text: {$search: req.params.query }}).sort('createdAt').find(function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
};

router.get('/:query', (req, res, next) => {
  searchByQuery(req, res, next);
});

router.get('/', (req, res) => {
  res.end();
});

export default router;
