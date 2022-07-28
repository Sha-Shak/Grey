import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from 'mongoose';
import postRoutes from './routes/posts.router.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
//adding a prefix
app.use('/posts', postRoutes);
const URL = 'mongodb+srv://mern:1234@cluster0.ncxmk.mongodb.net/?retryWrites=true&w=majority'
const PORT='8080'; 
mongoose.connect(URL)
.then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
.catch(e=> console.log(e))