import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const SinglePost = ({post}) => {
  return (  <>
      
      <Paper>
      <Grid container spacing={2}>
      <Grid item xs={8}>
      <Grid item variant="h2" xs={12}>{post.title}</Grid>
            <Grid item variant="p" xs={12}>{post.message}</Grid>
          </Grid>
          <Grid item xs={4}>{
            post.selectedFile ? <Img alt={post.title} src={post.selectedFile} /> : null
          }
            
          </Grid>
        </Grid>
      </Paper>
      </>
  )
}

export default SinglePost