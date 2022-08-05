const express = require('express');
const app = express();
const postRoutes = require('./routes/posts.router.js');
// const userRoutes = require('./routes/user.router.js');
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.json());

//adding a prefix
app.use('/posts', postRoutes);
//app.use('/user', userRoutes)
const PORT='8080'; 

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
