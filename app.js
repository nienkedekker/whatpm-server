require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const books = require('./routes/books');
const movies = require('./routes/movies');
const tvshows = require('./routes/tvshows');
const years = require('./routes/years');
const authentication = require('./routes/authentication');

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

// Use bodyparser middleware
// https://stackoverflow.com/a/47486182
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(cookieParser());

// Use Morgan for logging
app.use(logger('dev'));

// Set up routes
app.use('/api/authentication', authentication);
app.use('/api/books', books);
app.use('/api/movies', movies);
app.use('/api/tvshows', tvshows);
app.use('/api/years', years);

// When someone accesses the API directly via browser, don't show an error
app.get('/', function(req, res) {
  console.log(process.env.NODE_ENV);
  console.log(process.env.TEST);
  res.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
