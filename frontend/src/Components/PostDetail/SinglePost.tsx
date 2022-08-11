import { Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, {FunctionComponent} from 'react';
import { IPost } from '../../Interfaces';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface SinglePostProps {
  post: IPost
};

const SinglePost: FunctionComponent<SinglePostProps> = ({post}: SinglePostProps) => {
  return (  
    <>
      <Paper>
        <Grid container spacing={2} sx={{padding: '15px'}}>
        <Grid item xs={8}>
          <Grid item xs={12} sx={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>{post.title}</Grid>
            <Grid item xs={12} sx={{lineHeight: '1.5', textIndent: '20px'}}>{post.message}</Grid>
          </Grid>
          <Grid item xs={4}>{post.selectedFile ? 
            <Img alt={post.title} src={post.selectedFile} /> 
            : null}
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default SinglePost
