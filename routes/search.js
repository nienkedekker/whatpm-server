const express = require('express');
const router = express.Router();
const Item = require('../models/Item.js');

const searchByTitle = (req, res, next) =>  {
  Item.find({$text: {$search: req.params.title }}).sort('createdAt').find(function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
};

router.get('/:title', (req, res, next) => {
  searchByTitle(req, res, next);
});

module.exports = router;
