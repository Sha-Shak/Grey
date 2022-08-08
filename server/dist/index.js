"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const postRoutes = require('./routes/posts.router.ts');
const userRoutes = require('./routes/user.router.ts');
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express_1.default.json());
//adding a prefix
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
const PORT = '8080';
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map