const Posts =  require("../models/postMessage.model.ts");
const Users =  require('../models/user.model.ts');
import { Request, Response } from 'express';

type QueryParams = {
  id: string
}

export const getPosts = async (req: Request, res: Response)=>{
  try{
    const message = await Posts.find();
    return res.status(200).json(message);
  }catch(e){
    res.status(500);
    console.log(e)
  }
}


export const createPost = async (req,res)=>{
  try{
    const post = req.body;
    console.log(post, 'post', req.anonId)
    if(req.anonId){
      const postMessage = await Posts.create({...post, creator: req?.anonId})
      res.status(201);
      res.send(postMessage);
    } else {
      const postMessage = await Posts.create(post)
      res.status(201);
      res.send(postMessage);
    }
  } catch(e){
    res.status(500);
    console.log(e)
  }
}


export const createComment = async (req,res)=>{
  try{  
    const {comment, postId} = req.body;
    console.log("controller:", comment, req.userId, postId)
    const post = await Posts.findById(postId)
    const user = await Users.findById(req.userId)
    if(post && user){
      console.log("comments controller", comment)
      post.comments.push({id:postId, comment: comment, userId: user.name})
      const updatedPost = await Posts.findByIdAndUpdate(postId, post, {new: true},)
      res.status(201).send(updatedPost);
    } else {
      res.status(400).send('Post and User not found!')
    }
  } catch(e){
    res.status(500);
    console.log(e)
  }
}


export const updatePost = async (req,res)=>{
  try{
    const {title, message, creator, tag, selectedFile, likeCount} = req.body;
    const id = req.params.id;
    const post = await Posts.findById(id)
    if(post){
    post.title = title;
    post.message = message;
    post.tag = tag;
    post.selectedFile = selectedFile;
    
    post.save();
    res.status(200);
    res.send(post);
    } else {
      res.status(400).send("post not found")
    }
    
  } catch(e){
    res.status(500);
    console.log(e)
  }
}

export const deletePost = async (req: Request<QueryParams> ,res: Response)=>{
  try{
    const id:string = req.params.id;
    await Posts.findByIdAndDelete(id)   
    res.status(201);
    res.send("post deleted");  
  } catch(e){
    res.status(500);
    console.log(e)
  }
}


export const getOnePost = async (req: Request, res: Response)=>{
  try{
    const id: string = req.params.id;
    const post = await Posts.findById(id)   
    res.status(201);
    res.send(post);  
  } catch(e){
    res.status(500);
    console.log(e)
  }
}


export const likePost = async (req, res) => {
    const { id } = req.params;
    if(!req.userId) return res.json({message: "Unauthenticated"});
    try{
      const post = await Posts.findById(id);
      if (post) { 
        const index = post.likes.findIndex((id)=>  id === String(req.userId));
        if(index === -1){
            post.likes.push(req.userId)
        } else {
          post.likes = post.likes.filter(id=> id !== String(req.userId))
        }
        const updatedPost = await Posts.findByIdAndUpdate(id, post, { new: true });
        res.status(201).send(updatedPost);
      } else {
        res.status(500).send('post not found');
      }
    }catch(e){
      res.status(500)
      console.log(e)
    }
}