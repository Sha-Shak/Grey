import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import postRoutes from './routes/posts.router.js';
import userRoutes from './routes/user.router.js';
dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'})); // define the size limit
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
//adding a prefix
app.use('/posts', postRoutes);
app.use('/user', userRoutes)
const PORT='8080'; 
mongoose.connect(process.env.MONGO_URL)
.then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
.catch(e=> console.log(e))