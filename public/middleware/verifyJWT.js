"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer")))
        return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_CODE, (err, decode) => {
        if (err)
            return res.sendStatus(403);
        req.user = decode.user;
        next();
    });
};
module.exports = verifyJWT;
