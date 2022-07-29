import * as api from '../api/apiClient';

export const getPosts=()=> async(dispatch)=>{
  try{
    const data = await api.fetchPosts();
    dispatch({type: 'FETCH_ALL', payload: data})
  }catch(e){
    console.log(e)
  }
 
}
export const createPost=(post)=> async(dispatch)=>{
  console.log(post);
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



