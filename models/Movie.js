const mongoose = require('mongoose');
const Item = require('./Item');

Item.discriminator('Movie', new mongoose.Schema({
  director: { type: String, required: true },
}),
);

module.exports = mongoose.model('Movie');
