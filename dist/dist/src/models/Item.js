const mongoose = require('mongoose');
let Schema = mongoose.Schema;
function range(start, end) {
    return Array(end - start + 1)
        .fill()
        .map((value, index) => start + index);
}
function getCurrentYear() {
    return new Date().getFullYear();
}
const baseOptions = {
    discriminatorKey: 'itemtype',
    collection: 'items',
    timestamps: {},
};
mongoose.model('Item', new Schema({
    title: { type: String, required: true },
    published_year: { type: Number, required: true },
    belongs_to_year: {
        type: String,
        required: true,
        enum: [...range(2007, getCurrentYear())]
    },
    redo: { type: Boolean, required: false, default: false },
    updated_date: { type: Date, default: Date.now },
}, baseOptions));
module.exports = mongoose.model('Item');
