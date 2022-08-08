import { CircularProgress, Grid } from '@mui/material';
import Post from '../Post/Post';
import { IPost } from '../../Interfaces';

interface PostsProps {
  posts: IPost[],
  deletePost: (id: string) => any,
  likePost: (id: string) => any,
  getOnePost: (id: string) => any,
  getEditId: (id: string) => any,
};


const Posts = ({posts, deletePost, likePost, getOnePost, getEditId}: PostsProps) => {
 
  return (

     !posts.length ? <CircularProgress/> : (
      <Grid container alignItems= "stretch" spacing={3}>
      {
        posts.map((post: IPost)=> (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} deletePost={deletePost} likePost={likePost} getOnePost={getOnePost} getEditId={getEditId}/>
          </Grid>
        ))
      }
    </Grid>) 
    
      
  )
}

export default Posts