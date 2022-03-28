"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../models/User');
const bcrypt = require('bcrypt');
const userDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    console.log(user);
    try {
        const getUser = yield User.findOne({ email: user }, "email username image_s country state gender age").exec();
        if (!getUser)
            res.status(204).json({ "message": "User not found" });
        res.json({ "user": getUser });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
const userInfoUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, gender, age, country, state, user_id } = req.body;
    try {
        const hashedPwd = yield bcrypt.hash(password, 10);
        const result = yield User.findOneAndUpdate({ email: email }, {
            "username": username,
            "password": hashedPwd,
            "country": country,
            "state": state,
            "user_id": user_id,
            "gender": gender,
            "age": age
        });
        res.status(200).json({ "message": `User ${username}'s data updated.` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { userInfoUpdate, userDetail };
