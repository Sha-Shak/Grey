const Posts =  require('../models/postMessage.model.ts');
const Users =  require('../models/user.model.ts');
import { Request, Response } from 'express';


type QueryParams = {
  id?: string,
}

declare global {
  namespace Express {
   export interface Request {
      userId: any;
      anonId: any
    }
  }
}

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

interface IUser{
  name: string, 
  email: string, 
  password: string, 
  id: string
}


export const getPosts = async (req: Request, res: Response)=>{
  try{
    const message: IPost = await Posts.find();
    return res.status(200).json(message);
  }catch(e){
    res.status(500).send('error in server');
  }
}


export const createPost = async (req: Request, res: Response)=>{
  try{
    const post: IPost = req.body;
    if(req.anonId){
      const postMessage: IPost = await Posts.create({...post, creator: req?.anonId})
      res.status(201);
      res.send(postMessage);
    } else {
      const postMessage: IPost = await Posts.create(post)
      res.status(201);
      res.send(postMessage);
    }
  } catch(e){
    res.status(500).send('error in server');
  }
}


export const createComment = async (req: Request,res: Response)=>{
  try{  
    const {comment, postId}: {comment:string, postId: string} = req.body;
    const post: IPost = await Posts.findById(postId)
    const user: IUser = await Users.findById(req.userId)
    if(post && user){
      post.comments.push({id:postId, comment: comment, userId: user.name})
      const updatedPost: IPost = await Posts.findByIdAndUpdate(postId, post, {new: true},)
      res.status(201).send(updatedPost);
    } else {
      res.status(400).send('Post and User not found!')
    }
  } catch(e){
    res.status(500).send('error in server');
  }
}


export const updatePost = async (req: Request,res: Response)=>{
  try{
    const {title, message, creator, tag, selectedFile, likeCount}:
     {title:string, message:string, creator:string, tag:string, selectedFile:string, likeCount:number} = req.body;
    const id: string = req.params.id;
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
      res.status(400).send('post not found')
    }
    
  } catch(e){
    res.status(500).send('error in server');
  }
}


export const deletePost = async (req: Request<QueryParams> ,res: Response)=>{
  try{
    const id:string = req.params.id;
    await Posts.findByIdAndDelete(id)   
    res.status(201);
    res.send('post deleted');  
  } catch(e){
    res.status(500).send('error in server');
  }
}


export const getOnePost = async (req: Request, res: Response)=>{
  try{
    const id: string = req.params.id;
    const post: IPost = await Posts.findById(id)   
    res.status(201);
    res.send(post);  
  } catch(e){
    res.status(500).send('error in server');
  }
}


export const likePost = async (req: Request<QueryParams>, res: Response) => {

  const { id }: {id?:string} = req.params;
  
  if(!req.userId) return res.json({message: 'Unauthenticated'});
  try{
    const post = await Posts.findById(id);
    if (post) { 
      const index: number = post.likes.findIndex((id)=>  id === String(req.userId));
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
    res.status(500).send('error in server');
  }
}