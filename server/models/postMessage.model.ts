const mongoose = require('./index.ts');

interface IPost {
  creator: string,
  title: string,
  message: string,
  tag: string[],
  selectedFile: string,
  likes: string[],
  comments: IComment[]
}

interface IComment {
  id: string,
  comment: string,
  userId: string
}

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
       userId: String,
  }]
},{timestamps: true});

module.exports = mongoose.model('Post', postSchema);