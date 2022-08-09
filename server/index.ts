import express from "express";
const app = express();
const postRoutes = require('./routes/posts.router.ts');
const userRoutes = require('./routes/user.router.ts');
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.use('/posts', postRoutes);
app.use('/user', userRoutes)
const PORT='8080'; 

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
