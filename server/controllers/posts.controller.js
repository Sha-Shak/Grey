import Posts from "../models/postMessage.model.js";
export const getPosts = async (req,res)=>{
  try{
    const message = await Posts.find();
    return res.status(200).json(message)
  }catch(e){
    res.status(500);
    console.log(e)
  }
}
export const createPost = async (req,res)=>{
  try{
    const {title, message, creator, tag, selectedFile, likeCount, comments} = req.body;
    const postMessage = await Posts.create({title, message, creator, tag, selectedFile, likeCount,comments})
    res.status(201);
    res.send(postMessage);
  } catch(e){
    res.status(500);
    console.log(e)
  }
}
export const createComment = async (req,res)=>{
  try{
    const postId = req.params.id;
    const {comment} = req.body;
    const post = await Posts.findById(postId)
    post.comments.push({id:postId, comment: comment})
    const updatedPost = await Posts.findByIdAndUpdate(postId, post)
    console.log(updatedPost.comments);
    res.status(201).send(updatedPost);
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
export const deletePost = async (req,res)=>{
  try{
    const id = req.params.id;
    await Posts.findByIdAndDelete(id)   
    res.status(201);
    res.send("post deleted");  
  } catch(e){
    res.status(500);
    console.log(e)
  }
}
export const getOnePost = async (req,res)=>{
  try{
    const id = req.params.id;
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