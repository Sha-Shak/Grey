import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  creator: String,
  title: String,
  message: String,
  tag:[String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0
  }
},{timestamps: true});
const Posts = mongoose.model('Posts', postSchema)
export default Posts;