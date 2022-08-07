import { CircularProgress, Grid } from '@mui/material';
import Post from './Post/Post';
import { IPost } from '../../Interfaces';

interface PostsProps {
  posts: IPost[],
  editPost: (id: string) => any,
  deletePost: (id: string) => any,
  likePost: (id: string) => any,
  getOnePost: (id: string) => any,
};


const Posts = ({posts, editPost, deletePost, likePost, getOnePost}: PostsProps) => {
 
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