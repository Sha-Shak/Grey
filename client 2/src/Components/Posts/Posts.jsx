import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = () => {
  
  const posts = useSelector((state)=>state.posts)
  const [data, setData] = useState([])
  useEffect(()=>{
    setData(posts)
  }, [posts])
 
  return (

     !data.length ? <CircularProgress/> : (
      <Grid container alignItems= "stretch" spacing={3}>
      {
        data.map(post=> (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post}/>
          </Grid>
        ))
      }
    </Grid>) 
    
      
  )
}

export default Posts