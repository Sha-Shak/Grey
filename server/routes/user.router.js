import express from "express";
import { createUser, logInUser } from '../controllers/users.controller.js';
const router = express.Router();

//prefix added (localhost:8080/posts)
router.post('/signin', logInUser)
router.post('/signup', createUser)


export default router; 