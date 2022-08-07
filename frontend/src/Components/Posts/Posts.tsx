import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Post from './Post/Post';
import { IPost, RootState } from '../../Interfaces';

interface PostsProps {
  setData: any,
  data: IPost[],
  posts: IPost[],
  editPost: (id: string) => any,
  deletePost: (id: string) => any,
  likePost: (id: string) => any,
  getOnePost: (id: string) => any,
};


const Posts = ({setData, data, posts, editPost, deletePost, likePost, getOnePost}: PostsProps) => {
  

  // useEffect(()=>{
  //   setData(posts)
  // }, [posts]);
  console.log(posts, 'los postes')
 
  return (

     !posts.length ? <CircularProgress/> : (
      <Grid container alignItems= "stretch" spacing={3}>
      {
        posts.map((post: IPost)=> (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} editPost={editPost} deletePost={deletePost} likePost={likePost} getOnePost={getOnePost}/>
          </Grid>
        ))
      }
    </Grid>) 
    
      
  )
}

export default Posts