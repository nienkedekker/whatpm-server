const mongoose = require('mongoose');
const Item = require('./Item');

Item.discriminator('Book', new mongoose.Schema({
  author: { type: String, required: true },
}),
);

module.exports = mongoose.model('Book');
