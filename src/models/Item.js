import mongoose from 'mongoose';

const { Schema } = mongoose;

export function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((value, index) => start + index);
}

export function getCurrentYear(date) {
  return date.getFullYear();
}

const baseOptions = {
  discriminatorKey: 'itemtype',
  collection: 'items',
  timestamps: {},
};

mongoose.model('Item', new Schema({
  title: { type: String, required: true },
  published_year: { type: Number, required: true },
  // this should be a Number ¯⁠\_(ツ)_/⁠¯
  belongs_to_year: {
    type: String,
    required: true,
    enum: [...range(2007, getCurrentYear(new Date()))],
  },
  redo: { type: Boolean, required: false, default: false },
  updated_date: { type: Date, default: Date.now },
}, baseOptions));

export default mongoose.model('Item');
