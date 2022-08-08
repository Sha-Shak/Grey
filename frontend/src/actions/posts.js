import * as api from '../api/apiClient';

export const getPosts=()=> async(dispatch)=>{
  try{
    const data = await api.fetchPosts();
    dispatch({type: 'FETCH_ALL', payload: data})
  }catch(e){
    console.log(e)
  }
 
}

export const getOnePost=(id, navigate)=> async(dispatch)=>{
  try{
    const {data}= await api.fetchOnePost(id);
    console.log("fetchOne", data);
    dispatch({type: 'FETCH_ONE', payload: data})
    navigate("/post")
  }catch(e){
    console.log(e)
  }
 
}
export const createPost=(post)=> async(dispatch)=>{
  console.log("action post: ",post);
  try{
    const {data} = await api.createPost(post);
    dispatch({type: 'CREATE', payload: data})
  }catch(e){
    console.log(e)
  }
 
}

//seb version

export const editPost=(id)=>(dispatch)=>{
  try{
    console.log(id);
    dispatch({type: 'EDIT', payload: id})
  }catch(e){
    console.log(e)
  }
 
}
export const formEditPost=(id, post)=> async(dispatch)=>{
  console.log(post);
  try{
    const {data} = await api.updatePost(id, post);
    console.log("response is: ", data)
    dispatch({type: 'EDIT_DONE', payload: data})
  }catch(e){
    console.log(e)
  }
}

// ==== seb version end

export const deletePost=(id)=> async(dispatch)=>{
  try{
    console.log("req for deletion", id)
    await api.deleteOnePost(id);
    dispatch({type: 'DELETE', payload: id})
    
  }catch(e){
    console.log(e)
  }
}

export const likePost=(id)=>async (dispatch)=>{
  try{
    const {data} = await api.likePost(id)
    dispatch({type: 'LIKE', payload: data})
    console.log("action", data);
  }catch(e){
    console.log(e)
  }
 
} 
export const searchValue=(data)=> (dispatch)=>{
  try{
  console.log("search action", data);
  dispatch({type: 'SEARCH', payload: data})
  }catch(e){
    console.log(e)
  }
 
}

export const createComment=(value, postId)=> async(dispatch)=>{
  // console.log("create comment action",value, postId);
  try{
    const {data} = await api.createComment(value, postId);
    // console.log("commented post", data)
    dispatch({type: 'CREATE_COMMENT', payload: data})
  }catch(e){
    console.log(e)
  }
 
}

