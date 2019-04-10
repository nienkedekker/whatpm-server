"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User_1 = __importDefault(require("../models/User"));
const cookieExtractor = function (req) {
    let token;
    token = req && req.cookies ? req.cookies['mevn-token'] : null;
    return token;
};
const verify = function (passport) {
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]),
        secretOrKey: process.env.SECRET,
    };
    passport.use(new JwtStrategy(options, (jwtPayload, verificationResult) => {
        User_1.default.findOne({ id: jwtPayload.id }, (error, user) => {
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
