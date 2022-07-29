import express from "express";
import { createPost, deletePost, getOnePost, getPosts, likePost, updatePost } from '../controllers/posts.controller.js';
const router = express.Router();

//prefix added (localhost:8080/posts)
router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.get('/:id', getOnePost)
router.patch('/:id/likePost', likePost)
export default router; 