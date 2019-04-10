"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Item_1 = __importDefault(require("./Item"));
Item_1.default.discriminator('Show', new mongoose_1.default.Schema({
    season: { type: Number, required: true },
}));
exports.default = mongoose_1.default.model('Show');
