"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createUser, logInUser } = require('../controllers/users.controller.ts');
const router = express_1.default.Router();
//prefix added (localhost:8080/posts)
router.post('/signin', logInUser);
router.post('/signup', createUser);
module.exports = router;
//# sourceMappingURL=user.router.js.map