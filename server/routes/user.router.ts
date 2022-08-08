import express from "express";

const { createUser, logInUser } = require('../controllers/users.controller.ts'); 
const router = express.Router();


//prefix added (localhost:8080/posts)
router.post('/signin', logInUser)
router.post('/signup', createUser)


module.exports = router