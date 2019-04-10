"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
function range(start, end) {
    return Array(end - start + 1)
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
mongoose_1.default.model('Item', new Schema({
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
exports.default = mongoose_1.default.model('Item');
