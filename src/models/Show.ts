import mongoose from 'mongoose';
import Item from './Item';

Item.discriminator('Show', new mongoose.Schema({
  season: { type: Number, required: true },
}));

export default mongoose.model('Show');
