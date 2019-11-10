/* eslint-disable no-underscore-dangle */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import settings from '../authentication/settings';
import User from '../models/User';

require('../authentication/passport')(passport);

const router = express.Router();

/**
 * POST /register route.
 */
router.post('/register', (req, res) => {
  // When in production, registration is not possible, so return an error.
  if (process.env.ENVIRONMENT === 'production') {
    return res.status(403)
      .send({
        success: false,
        message: 'Cannot register right now.',
      });
  }

  // A username or password is missing, so return an error
  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      message: 'Fill in the required fields.',
    });
  }

  // No registration errors, so create a new User
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // Save the user
  newUser.save((err) => {
    if (err) {
      // Error upon saving
      return res.status(401)
        .send({
          success: false,
          message: 'Registration failed. Try again.',
        });
    }
    // No error, we have a new user
    return res.json({
      success: true,
      message: 'Successfully created new user!',
    });
  });

  // All other cases
  return res.status(403)
    .send({
      success: false,
      message: 'Cannot register right now.',
    });
});

/**
 * POST /login route.
 * If user is found and password is correct, create a token.
 * Every request to the API will have to include this token.
 * The payload contains the user's id. We could also make the
 * username and password part of the payload,
 * but because JWT Tokens are only base64 encoded, this would potentially
 * expose sensitive information to bad actors.
 */
router.post('/login', (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    // There's an unspecified error
    if (err) {
      return res.json({
        success: false,
        message: 'Login failed.',
      });
    }

    // The user doesn't exist
    if (!user) {
      res.status(401)
        .send({
          success: false,
          message: 'Login failed.',
        });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, (error, isMatch) => {
        // There's a match and no error
        if (isMatch && !error) {
          const userId = user._id;
          const tokenData = userId.toJSON();
          const token = jwt.sign({
            expiresIn: '7d',
            tokenData,
          }, settings.secret);
          res.send({ success: true, token });
        } else {
          res.status(401)
            .send({
              success: false,
              message: 'Login failed.',
            });
        }
      });
    }

    // All other cases
    return res.status(403)
      .send({
        success: false,
        message: 'Cannot login right now.',
      });
  });
});

export default router;
