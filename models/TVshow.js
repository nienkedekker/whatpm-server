const mongoose = require('mongoose');

const Item = require('./Item');
Item.discriminator('TVshow', new mongoose.Schema({
  season: { type: Number, required: true },
}),
);

module.exports = mongoose.model('TVshow');
