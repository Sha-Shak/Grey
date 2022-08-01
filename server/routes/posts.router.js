import express from "express";
import { createComment, createPost, deletePost, getOnePost, getPosts, likePost, updatePost } from '../controllers/posts.controller.js';
import auth from "../middleware/auth.js";
import createAuth from "../middleware/createAuth.js";
const router = express.Router();

//prefix added (localhost:8080/posts)
router.get('/', getPosts)
router.get('/:id', getOnePost)
router.post('/', createAuth,  createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id',  deletePost)
router.patch('/:id/likePost', auth, likePost)
router.patch('/:id/comment', auth, createComment)
export default router; 