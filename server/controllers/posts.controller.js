import Posts from "../models/postMessage.model.js";
export const getPosts = async (req,res)=>{
  try{
    const message = await Posts.find();
    return res.status(200).json(message)
  }catch(e){
    res.status(500);
    console.log(e)
  }
  res.send('Hello from controller');
}
export const createPost = async (req,res)=>{
  try{
    const {title, message, creator, tag, selectedFile, likeCount} = req.body;
    const postMessage = await Posts.create({title, message, creator, tag, selectedFile, likeCount})
    res.status(201);
    res.send(postMessage);
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

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}