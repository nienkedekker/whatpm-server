require('dotenv').config();
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var settings = require('./settings');
var cookieExtractor = function (req) {
    var token;
    token = req && req.cookies ? req.cookies['mevn-token'] : null;
    return token;
};
var verify = function (passport) {
    var options = {};
    options.jwtFromRequest = ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]);
    options.secretOrKey = settings.secret;
    passport.use(new JwtStrategy(options, function (jwtPayload, verificationResult) {
        User.findOne({ id: jwtPayload.id }, function (error, user) {
            if (error) {
                return verificationResult(error, false);
            }
            else if (user) {
                verificationResult(null, user);
            }
            else {
                verificationResult(null, false);
            }
        });
    }));
};
module.exports = verify;
