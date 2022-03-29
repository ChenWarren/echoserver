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
const jwt = require('jsonwebtoken');
const tokenHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    console.log(cookies);
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(401).json({ "message": "Unauthorized" });
    const refreshTK = cookies.jwt;
    try {
        const findUser = yield User.findOne({ refreshToken: refreshTK }).exec();
        if (!findUser)
            return res.status(401).json({ "message": "Unauthorized" });
        jwt.verify(refreshTK, process.env.REFRESH_TOKEN_CODE, (err, decode) => {
            if (err || findUser.email !== decode.user)
                return res.sendStatus(403).json({ "message": "Forbiden" });
            const accessTK = jwt.sign({ "user": findUser.email }, process.env.ACCESS_TOKEN_CODE, { expiresIn: '1h' });
            res.json({ accessTK });
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
});
module.exports = { tokenHandler };
