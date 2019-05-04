require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const books = require('./routes/books');
const movies = require('./routes/movies');
const shows = require('./routes/shows');
const years = require('./routes/years');
const authentication = require('./routes/authentication');
const search = require('./routes/search');
const stats = require('./routes/stats');

const app = express();

const corsOriginDevelopment = 'http://localhost:8080';
const corsOriginProduction = 'https://what.pm';

app.use(cors({
  credentials: true,
  origin: process.env.NODE_ENV === 'production' ? corsOriginProduction : corsOriginDevelopment
}));

const mongoDbUrl = process.env.MONGO_DB_URL;
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
  .catch(err => console.error(err));

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
app.use('/api/stats', stats);

// When someone accesses the API directly via browser, don't show an error
app.get('/', (req, res) => {
  res.end();
});

module.exports = app;
