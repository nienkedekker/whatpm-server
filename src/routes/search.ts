const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

const searchByQuery = (req: { params: { query: any; }; }, res: { json: any }, next: any) =>  {
  Item.find({$text: {$search: req.params.query }}).sort('createdAt').find(function (err: any, items: any) {
    if (err) return next(err);
    res.json(items);
  });
};

router.get('/:query', (req: { params: { query: any; }; }, res: { json: any; }, next: any) => {
  searchByQuery(req, res, next);
});

router.get('/', (res: { end: () => void; }) => {
  res.end();
});

export default router;
