import mongoose from 'mongoose';
import Item from './Item';

Item.discriminator('Movie', new mongoose.Schema({
  director: { type: String, required: true },
}));

export default mongoose.model('Movie');
