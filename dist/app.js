"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const authentication_1 = __importDefault(require("./src/routes/authentication"));
const books_1 = __importDefault(require("./src/routes/books"));
const movies_1 = __importDefault(require("./src/routes/movies"));
const shows_1 = __importDefault(require("./src/routes/shows"));
const years_1 = __importDefault(require("./src/routes/years"));
const search_1 = __importDefault(require("./src/routes/search"));
const app = express();
const corsOriginDevelopment = 'http://localhost:8080';
const corsOriginProduction = 'https://what.pm';
app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' ? corsOriginProduction : corsOriginDevelopment
}));
const mongoDbUrl = process.env.MONGO_DB_URL ? process.env.MONGO_DB_URL : '';
mongoose.Promise = require('bluebird');
mongoose
    .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    promiseLibrary: require('bluebird')
})
    .then(() => console.log(` → Successful connection to MongoDB URL: ${process.env.MONGO_DB_URL}`))
    .catch((err) => console.error(err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/authentication', authentication_1.default);
app.use('/api/books', books_1.default);
app.use('/api/movies', movies_1.default);
app.use('/api/shows', shows_1.default);
app.use('/api/years', years_1.default);
app.use('/api/search', search_1.default);
app.get('/', function (req, res) {
    res.end();
});
module.exports = app;
