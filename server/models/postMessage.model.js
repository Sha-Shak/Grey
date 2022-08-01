import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  tag:[String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [], 
  },
  comments: [
     { 
      id: String,
      comment: String,
  }]
},{timestamps: true});
const Posts = mongoose.model('Posts', postSchema)
export default Posts;