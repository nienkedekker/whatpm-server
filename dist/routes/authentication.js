"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const settings = require('../authentication/settings');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
require('../authentication/passport')(passport_1.default);
const router = express_1.default.Router();
router.post('/register', function (req, res) {
    if (process.env.ENVIRONMENT == 'production') {
        return res.status(403).send({ success: false, message: 'Cannot register right now.' });
    }
    else {
        if (!req.body.username || !req.body.password) {
            return res.json({ success: false, message: 'Fill in the required fields.' });
        }
        else {
            const newUser = new User_1.default({
                username: req.body.username,
                password: req.body.password,
            });
            newUser.save(function (err) {
                if (err) {
                    return res.status(401).send({ success: false, message: 'Registration failed. Try again.' });
                }
                return res.json({ success: true, message: 'Successfully created new user!' });
            });
        }
    }
});
router.post('/login', function (req, res) {
    User_1.default.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
            return res.json({ success: false, message: 'Login failed.' });
        }
        if (!user) {
            res.status(401).send({ success: false, message: 'Login failed.' });
        }
        else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const userId = user._id;
                    const tokenData = userId.toJSON();
                    const token = jsonwebtoken_1.default.sign({ expiresIn: '7d', tokenData }, settings.secret);
                    res.send({ success: true, token: token });
                }
                else {
                    res.status(401).send({ success: false, message: 'Login failed.' });
                }
            });
        }
    });
});
exports.default = router;
