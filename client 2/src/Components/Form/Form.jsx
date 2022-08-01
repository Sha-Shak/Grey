import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, formEditPost } from '../../actions/posts';

//

const Form = () => {
  const [postData, setPostData] =useState({creator: '', title: '', message: '', tag: [], selectedFile: ''})
  //const post = useSelector((state) => (id ? state.posts.find((message) => message._id === currentId) : null));
  const editId = useSelector(state=>state.edit);
  let onePost = useSelector(state=> editId ? state.posts.find((post)=> post._id === editId) : null);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(onePost) setPostData(onePost)
  },[onePost])
  const handleSubmit= (e)=>{
    e.preventDefault();
    if(!editId){
      dispatch(createPost(postData)) 
    } else {  
      dispatch(formEditPost(editId, postData))
      onePost = null;
    }
    e.target.reset();
    setPostData({creator: '', title: '', message: '', tag: [], selectedFile: ''})
    console.log('Submit clicked') 
    }
  const handleClear = ()=>{
    console.log('clear clicked')
    onePost = null;
  }
  return (
    <Paper>
      <form onSubmit={handleSubmit}>
          { onePost ? (<Typography variant='h6' >  Edit a post </Typography>) : (<Typography variant='h6' >  Create a post </Typography>) }
        <TextField name="creator" value={postData.creator } variant = "outlined" label="creator" fullWidth onInput={(e)=> setPostData({...postData, creator: e.target.value})} />
        <TextField name="title" variant = "outlined" label="Title" fullWidth value={  postData.title } onInput={(e)=> setPostData({...postData, title: e.target.value})} required/>
        <TextField multiline maxRows={8} name="message" variant = "outlined" label="Message" fullWidth value={  postData.message } onChange={(e)=> setPostData({...postData, message: e.target.value})} required />
        <TextField name="tag" variant = "outlined"  label="Tags" fullWidth value={ postData.tag } onChange={(e)=> setPostData({...postData, tag: e.target.value.split(',')})} required />
        <div>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
        </div>
       <Button variant="contained" type="submit" size="large" fullWidth > {onePost ? "Edit" : "Submit"}</Button>
       <Button onClick={handleClear} variant='outlined' size="small">Clear</Button> 
      </form>
    </Paper>
  )
}

export default Form