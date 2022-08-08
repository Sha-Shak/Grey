import { Button, Grid, TextField, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Comment, IPost } from '../../Interfaces/index.js';
import SinglePost from './SinglePost';
import * as api from '../../api/apiClient';

interface PostDetailProps {
  post: IPost
}

const PostDetail: FunctionComponent<PostDetailProps> = ({post}: PostDetailProps) => {
  const storage: any = localStorage.getItem('user');
  const [ user, setUser ] = useState(JSON.parse(storage));
  const location = useLocation();
  const data = location.state as IPost;
  const navigate = useNavigate();

  const handleSubmit = (e: any)=>{
    e.preventDefault();
    const value = e.target.comment.value;
    console.log("value is: ", value)
    createComment(value, data._id);
  }

  const createComment = async(value: string, postId: string) => {
    console.log('in')
    try{
      const {data} = await api.createComment(value, postId);
      console.log("commented post", data)
      
    }catch(e){
      console.log(e)
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
              { !(data.comments.length>0) 
                ? (<Typography item variant="h6" sx={{color:'grey'}}>No comments yet</Typography>) 
                : (
                   <Grid container> {
                      data.comments.map((comment: Comment)=> (  
                        
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