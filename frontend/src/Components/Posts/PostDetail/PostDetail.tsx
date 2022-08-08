import { Button, Grid, TextField, Typography } from '@mui/material';
import { FunctionComponent ,useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createComment } from '../../../actions/posts.js';
import { Comment, RootState } from '../../../Interfaces/index.js';
import SinglePost from './SinglePost';


const PostDetail: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storage: any = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(storage));
  const post = useSelector((state: RootState)=> state.onePost);
 
  useEffect(()=>{  
    if(!post) navigate("/") //todo doesn't work 
  },[])

  const numOfComments = post.comments.length;

  const handleSubmit= (e)=>{
     e.preventDefault()
    const value = e.target.comment.value
    console.log("value is: ", value)
    dispatch(createComment(value,  post._id))
  }
 
  return (
  
      <div>
      <SinglePost post={post}/>
      
      <div>
        {
          (user)
          ? (
            <div>
              <form onSubmit={handleSubmit}>
                <Grid item xs={12}>
                  <TextField multiline maxRows={8} name="comment" variant = "outlined" label="Add a Comment..." fullWidth/>
                </Grid>
                <Button variant="contained" color="primary" type="submit">Add Comment</Button>
              </form>
              <Grid container>
                <Typography item variant = "h5">Comment({numOfComments})</Typography>
              </Grid>
              <Grid container>
              { !(numOfComments>0) 
                ? (<Typography item variant="h6" sx={{color:'grey'}}>No comments yet</Typography>) 
                : (
                   <Grid container> {
                      post.comments.map((comment: Comment)=> (  
                        
                     <Grid item key={comment._id} fullwidth sx={{width: '100%', padding: '15px', borderBottom: 'thin solid lightgray'}}>{`${comment.comment}, user: ${comment.userId}`}</Grid> 
                      
                      ))
                    }
                    </Grid>
                  
                  )
              }
              </Grid>
            </div>
          ) 
          : (<Grid container>
              <Grid item variant="h5" sx={{position: 'absolute', left: '40%', cursor: "pointer"}} onClick={e=> {navigate('/auth')}}> Please Log In to see the comments </Grid>
            </Grid>)
        }
      </div>
      </div>
    
  ) 
}

export default PostDetail