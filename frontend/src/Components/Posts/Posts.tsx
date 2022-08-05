import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { IPost, RootState } from '../Interfaces';

const Posts = ({setData, data}) => {
  
  const posts = useSelector((state: RootState) => state.posts)
 
  useEffect(()=>{
    setData(posts)
  }, [posts])
  
 
  return (

     !posts.length ? <CircularProgress/> : (
      <Grid container alignItems= "stretch" spacing={3}>
      {
        data.map((post: IPost)=> (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post}/>
          </Grid>
        ))
      }
    </Grid>) 
    
      
  )
}

export default Posts