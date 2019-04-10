require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import User from '../models/User';

const cookieExtractor = function (req: { cookies: { [token: string]: any; }; }) {
    let token: string;
    token = req && req.cookies ? req.cookies['mevn-token'] : null;
    return token;
};

const verify = function(passport: { use: (use: any) => void; }) {
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]),
        secretOrKey: process.env.SECRET,
    };
    
    passport.use(new JwtStrategy(options, (jwtPayload: { id: number; }, verificationResult: any) => {
        User.findOne({ id: jwtPayload.id }, (error: Error, user: object) => {
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
