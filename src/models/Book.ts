import mongoose = require('mongoose');
import Item from './Item';

Item.discriminator('Book', new mongoose.Schema({
  author: { type: String, required: true },
}));

export default mongoose.model('Book');
