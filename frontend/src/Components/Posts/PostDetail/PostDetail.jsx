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
  const [comments, setComments] = useState([...post.comments])
  console.log("initialComments", comments)
  const fetchComments= useSelector((state)=> state.comments);
  useEffect(()=>{
    console.log(comments);
    setComments(prevComments=> {
      console.log("previous comments: ",prevComments);
      return ([...prevComments, ...fetchComments]) 
      })
 },[])
  useEffect(()=>{
    if(!post) navigate("/") //todo doesn't work 
  },[])
  const numOfComments = comments.length;
  
   
  //const [newPost, setNewPost] = useState(post)

  const handleComment= (id, comment)=>{
    
  }
  const handleSubmit= (e)=>{
     e.preventDefault()
    const value = e.target.comment.value
    console.log("value is: ", value)
    dispatch(createComment(value,  post._id))
   // setComments(prevComments=> ( {...prevComments, value}))
  }
 
  return (
  
      <div>
      <SinglePost post={post}/>
       <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField multiline maxRows={8} name="comment" variant = "outlined" label="Add a Comment..." fullWidth  onChange={(e)=> handleComment(post._id, e.target.value)} />
      </Grid>
      <Button variant="contained" color="primary" type="submit">Add Comment</Button>
      </form>
      <div>
        {user.result 
          ? (
            <div>
              <Grid container>
                <Typography item variant = "h3">Comment({numOfComments})</Typography>
                
              </Grid>
              <Grid container>
              { !(numOfComments>0) 
                ? (<Typography item variant="h6" sx={{color:'grey'}}>No comments yet</Typography>) 
                : (
                   <Grid container> {
                      comments.map(comment=> (  
                     <Grid item key={comment._id} fullwidth>{comment.comment}</Grid> 
                      
                      ))
                    }
                    </Grid>
                  
                  )
              }
              </Grid>
            </div>
          ) 
          : null
        }
      </div>
      </div>
    
  ) 
}

export default PostDetail