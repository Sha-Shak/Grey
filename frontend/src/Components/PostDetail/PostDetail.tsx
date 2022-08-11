import { Button, Grid, TextField, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Comment, IPost } from '../../Interfaces/index.js';
import SinglePost from './SinglePost';
import * as api from '../../api/apiClient';


const PostDetail: FunctionComponent = () => {
  const storage: any = localStorage.getItem('user');
  const [ user, setUser ] = useState(JSON.parse(storage));
  const location = useLocation();
  const data = location.state as IPost;
  const [ postData, setPostData ] = useState(data);
  const navigate = useNavigate();

  const handleSubmit = (e: any)=>{
    e.preventDefault();
    const value = e.target.comment.value;
    createComment(value, data._id);
  }

  const createComment = async(value: string, postId: string) => {
    try{
      const {data} = await api.createComment(value, postId);
      setPostData(data);
    }catch(e){
      alert(`There has been an error: ${e}`)
    }
  }
  
 
  return (
  
      <div>
      <SinglePost post={data}/>
      
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
                <Typography item variant = "h5">Comment({data.comments.length})</Typography>
              </Grid>
              <Grid container>
              { !(postData.comments.length>0) 
                ? (<Typography item variant="h6" sx={{color:'grey'}}>No comments yet</Typography>) 
                : (
                   <Grid container> {
                      postData.comments.map((comment: Comment)=> (  
                        
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