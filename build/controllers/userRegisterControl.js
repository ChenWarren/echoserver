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
const registerNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, username, pwd, gender, age, country, state, user_id } = req.body;
    if (!account || !username || !pwd || !country || !state)
        return res.status(400).json({ 'message': 'Account, username, password, country, and state are required.' });
    const accountCheck = yield User.findOne({ account: account }).exec();
    const usernameCheck = yield User.findOne({ username: username }).exec();
    if (accountCheck)
        return res.status(409).json({ 'message': 'Account exist!' });
    if (usernameCheck)
        return res.status(409).json({ 'message': 'Username exist!' });
    try {
        const hashedPwd = yield bcrypt.hash(pwd, 10);
        const result = yield User.create({
            "account": account,
            "username": username,
            "password": hashedPwd,
            "country": country,
            "state": state,
            "user_id": user_id,
            "gender": gender,
            "age": age
        });
        console.log(result);
        res.status(201).json({ 'message': `New user ${username} created!` });
    }
    catch (err) {
        res.status(500).json({ 'message': err.message });
    }
});
module.exports = { registerNewUser };
