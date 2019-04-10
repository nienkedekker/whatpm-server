require('dotenv').config();
import mongoose = require('mongoose');
import cookieParser = require('cookie-parser');
import cors = require('cors');
import express = require('express');
import bodyParser = require('body-parser');

import authentication from './routes/authentication';
import books from './routes/books';
import movies from './routes/movies';
import shows from './routes/shows';
import years from './routes/years';
import search from './routes/search';

const app = express();

const corsOriginDevelopment :string = 'http://localhost:8080';
const corsOriginProduction :string = 'https://what.pm';

app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV === 'production' ? corsOriginProduction : corsOriginDevelopment
}));

const mongoDbUrl :string = process.env.MONGO_DB_URL ? process.env.MONGO_DB_URL : '';
mongoose.Promise = require('bluebird');
mongoose
  .connect(
    mongoDbUrl,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      promiseLibrary: require('bluebird')
    }
  )
  .then(() => console.log(` → Successful connection to MongoDB URL: ${process.env.MONGO_DB_URL}`))
  .catch((err: any) => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up routes
app.use('/api/authentication', authentication);
app.use('/api/books', books);
app.use('/api/movies', movies);
app.use('/api/shows', shows);
app.use('/api/years', years);
app.use('/api/search', search);

// When someone accesses the API directly via browser, don't show an error
app.get('/', function(req, res) {
  res.end();
});

module.exports = app;
