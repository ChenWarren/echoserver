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
const logoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401).json({ "message": "Unauthorized" });
    const refreshTK = cookies.jwt;
    try {
        const findUser = yield User.findOne({ refreshToken: refreshTK }).exec();
        if (!findUser) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.status(204).json({ "message": "Logout" });
        }
        findUser.refreshToken = '';
        const result = yield findUser.save();
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.status(204).json({ "message": "Logout" });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { logoutHandler };
