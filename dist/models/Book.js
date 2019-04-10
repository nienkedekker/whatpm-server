"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Item_1 = __importDefault(require("./Item"));
Item_1.default.discriminator('Book', new mongoose.Schema({
    author: { type: String, required: true },
}));
exports.default = mongoose.model('Book');
