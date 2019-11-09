import Settings from './settings';

import User from '../models/User';

require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

/**
 * Get cookie from client
 * @param {object} req
 */
const cookieExtractor = (req) => (req && req.cookies ? req.cookies['mevn-token'] : null);

/**
 * Verify request based on JWT obtained from cookie
 * @param {object} passport
 */
const verify = (passport) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]),
    secretOrKey: Settings.secret,
  };

  /**
   * @param {object} jwtPayload
   * @param {function} verificationResult (error, user)
   */
  passport.use(new JwtStrategy(jwtOptions, (jwtPayload, verificationResult) => {
    // eslint-disable-next-line consistent-return
    User.findOne({ id: jwtPayload.id }, (error, user) => {
      if (error) {
        // verification not successful, error message is thrown
        return verificationResult(error, false);
      } if (user) {
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
