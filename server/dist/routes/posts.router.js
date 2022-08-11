"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { createComment, createPost, deletePost, getOnePost, getPosts, likePost, updatePost } = require('../controllers/posts.controller.ts');
const auth = require('../middleware/auth.ts');
const createAuth = require('../middleware/createAuth.ts');
const router = express_1.default.Router();
// prefix added (localhost:8080/posts)
router.get('/', getPosts);
router.get('/:id', getOnePost);
router.post('/', createAuth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', auth, likePost);
module.exports = router;
//# sourceMappingURL=posts.router.js.map