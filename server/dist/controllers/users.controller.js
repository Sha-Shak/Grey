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
exports.createUser = exports.logInUser = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require('../models/user.model.ts');
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const result = yield Users.findOne({ email });
        if (!result)
            return res.status(404).send("User doesn't exist");
        const isPassword = yield bcrypt.compare(password, result.password);
        if (!isPassword)
            return res.status(400).json({ message: "JSON Wrong Password" });
        const token = jwt.sign({ email: result.email, id: result._id }, "aa@#A1", { expiresIn: "1hr" });
        res.status(200).json({ email: result.email, result, token });
    }
    catch (e) {
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.logInUser = logInUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        const existingUser = yield Users.findOne({ email });
        if (existingUser)
            return res.status(400).send("User already exists");
        if (password !== confirmPassword)
            return res.status(400).json({ message: "Passwords don't match!" });
        const hashedPassword = yield bcrypt.hash(password, 10);
        const result = yield Users.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id, password: result.password }, "aa@#A1", { expiresIn: "1hr" });
        res.status(201).json({ result, token });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "something went wrong" });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=users.controller.js.map