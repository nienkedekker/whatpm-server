const express = require('express');
const passport = require('passport');
const settings = require('../authentication/settings');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('../authentication/passport')(passport);

const router = express.Router();

/**
 * POST /register route.
 * When in production, registration is not possible, so return an error.
 */
router.post('/register', function(req, res) {
  // if (process.env.ENVIRONMENT == 'production') {
  //   return res.status(403).send({success: false, message: 'Cannot register right now.'});
  // } else {
  if (!req.body.username || !req.body.password) {
    return res.json({ success: false, message: 'Fill in the required fields.' });
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
      // save the user
    newUser.save(function(err) {
      if (err) {
        return res.status(401).send({ success: false, message: 'Registration failed. Try again.'});
      }
      return res.json({ success: true, message: 'Successfully created new user!' });
    });
  }

});

/**
 * POST /login route.
 * If user is found and password is correct, create a token.
 * Every request to the API will have to include this token.
 * The payload contains the user's id. We could also make the username and password part of the payload,
 * but because JWT Tokens are only base64 encoded, this would potentially expose sensitive information to bad actors.
 */
router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) { return res.json({ success: false, message: 'Login failed.' }); }
    if (!user) { res.status(401).send({ success: false, message: 'Login failed.'}); }
    else {
      // check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          const userId = user._id;
          const tokenData = userId.toJSON();
          const token = jwt.sign({ expiresIn: '7d' , tokenData}, settings.secret);
          res.send({ success: true, token: token });
        } else {
          res.status(401).send({ success: false, message: 'Login failed.' });
        }
      });
    }
  });
});

module.exports = router;
