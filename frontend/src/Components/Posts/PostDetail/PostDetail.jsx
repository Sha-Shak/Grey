import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createComment } from '../../../actions/posts.js';
import SinglePost from './SinglePost';

const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storage = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(storage)) ;
  const post = useSelector((state)=> state.onePost);
 
  useEffect(()=>{
    
    if(!post) navigate("/") //todo doesn't work 
  },[])
  // console.log("before post : ", post.comments)
  // const [comments, setComments] = useState(post.comments)
  // console.log("initialComments", comments)
  // const fetchComments= useSelector((state)=> state.comments);
  // console.log("compare comments", fetchComments, comments );
//   useEffect(()=>{
//     return setComments(fetchComments) 
//  },[fetchComments])
  const numOfComments = post.comments.length;

  const handleComment= (id, comment)=>{
    
  }
  const handleSubmit= (e)=>{
     e.preventDefault()
    const value = e.target.comment.value
    console.log("value is: ", value)
    dispatch(createComment(value,  post._id))
    // console.log("after dispatch",fetchComments)
    
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
                  <TextField multiline maxRows={8} name="comment" variant = "outlined" label="Add a Comment..." fullWidth  onChange={(e)=> handleComment(post._id, e.target.value)} />
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
                      post.comments.map((comment)=> (  
                        
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