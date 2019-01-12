require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const settings = require('./settings');

/**
 * Get cookie from client
 * @param {object} req
 */
const cookieExtractor = (req) => {
  let token;
  token = req && req.cookies ? req.cookies['mevn-token'] : null;
  return token;
};

/**
 * Verify request based on JWT obtained from cookie
 * @param {object} passport
 */
const verify = (passport) => {
  let options = {};

  options.jwtFromRequest = ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]);
  options.secretOrKey = settings.secret;

  /**
   * @param {object} jwtPayload
   * @param {function} verificationResult (error, user)
   */
  passport.use(new JwtStrategy(options, (jwtPayload, verificationResult) => {
    User.findOne({ id: jwtPayload.id }, (error, user) => {
      if (error) {
        // verification not successful, error message is thrown
        return verificationResult(error, false);
      } else if (user) {
        // verification successful
        verificationResult(null, user);
      } else {
        // verification not successful, no errors thrown
        verificationResult(null, false);
      }
    });
  }));
};

module.exports = verify;
