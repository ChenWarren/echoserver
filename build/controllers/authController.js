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
const jwt = require('jsonwebtoken');
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { account, pwd } = req.body;
    if (!account || !pwd)
        return res.status(400).json({ "message": "Account, password are required." });
    const foundAccount = yield User.findOne({
        account: account
    }).exec();
    if (!foundAccount)
        return res.status(401);
    const match = yield bcrypt.compare(pwd, foundAccount.password);
    if (match) {
        const accessTk = jwt.sign({ "user": foundAccount.account }, process.env.ACCESS_TOKEN_CODE, { expiresIn: '300s' });
        const refreshTk = jwt.sign({ "user": foundAccount.account }, process.env.REFRESH_TOKEN_CODE, { expiresIn: '1d' });
        foundAccount.refreshToken = refreshTk;
        const result = yield foundAccount.save();
        res.cookie('jwt', refreshTk, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessTk });
    }
    else {
        res.sendStatus(401);
    }
});
module.exports = { loginHandler };
