import express from "express";
import { createComment, createPost, deletePost, getOnePost, getPosts, likePost, updatePost } from '../controllers/posts.controller.js';
import auth from "../middleware/auth.js";
const router = express.Router();

//prefix added (localhost:8080/posts)
router.get('/', getPosts)
router.get('/:id', getOnePost)
router.post('/',  createPost)
router.patch('/:id', auth, updatePost)
router.patch('/:id', auth, updatePost)
router.delete('/:id',  deletePost)
router.patch('/:id/likePost', auth, likePost)
router.patch('/:id/comment', createComment)
export default router; 