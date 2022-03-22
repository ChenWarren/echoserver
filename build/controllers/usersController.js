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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Users = yield User.find({}, 'email username  country state gender age');
    if (!Users)
        return res.status(204).json({ "message": "No Users found" });
    res.json({ "Users": Users });
});
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let username = '';
    if (!((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.username))
        return res.status(400).json({ "message": "Username required" });
    username = req.params.username;
    const user = yield User.findOne({ username }, 'email username  country state gender age').exec();
    if (!user) {
        return res.status(204).json({ "message": `Username ${req.params.username} not found` });
    }
    res.json({
        "user": user
        // "eamil":user.email,
        // "username":user.username,
        // "country":user.country,
        // "state":user.state,
        // "gender":user.gender,
        // "age":user.age,
    });
});
const getOneUserAndDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let username = '';
    if (!((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.username))
        return res.status(400).json({ "message": "Username required" });
    username = req.params.username;
    const user = yield User.findOneAndDelete({ username }).exec();
    if (!user) {
        return res.status(204).json({ "message": `Username ${req.params.username} not found` });
    }
    res.json({
        message: "The user deleted Successfull"
    });
});
module.exports = {
    getAllUsers,
    getOneUser,
    getOneUserAndDelete
};
