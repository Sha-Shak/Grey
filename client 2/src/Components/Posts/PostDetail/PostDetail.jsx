import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

const PostDetail = () => {
  const post = useSelector((state)=> state.onePost);
  const comments = post.comments;
  const len = comments.length;
  console.log(post)
  const storage = localStorage.getItem('user')
  const [user, setUser] = useState(JSON.parse(storage)) 
  //const [newPost, setNewPost] = useState(post)

  const handleComment= (e)=>{
    //console.log("hcomment", e.target.value)
  }
  const handleSubmit= (e)=>{
     e.preventDefault()
     //console.log(post._id, post)
    //  setNewPost((prevNewPost)=>{
    //   ...prevNewPost, comments: e.target.value
    //  })
    const value = e.target.comment.value
    console.log(post._id, post, value)
  }
 
  return (
    <div>
      <SinglePost post={post}/>
       <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <TextField multiline maxRows={8} name="comment" variant = "outlined" label="Add a Comment..." fullWidth  onChange={(e)=> handleComment(1, e.target.value)} />
      </Grid>
      <Button variant="contained" color="primary" type="submit">Add Comment</Button>
      </form>
      <div>
        {user 
          ? (
            <div>
              <Grid container>
                <Typography item variant = "h3">Comment({len})</Typography>
                <hr/>
              </Grid>
              <Grid container>
              { !(len>0) 
                ? (<Typography item variant="h6" sx={{color:'grey'}}>No comments yet</Typography>) 
                : (
                 {/* comments.map(comment=> ({
                      <Grid container> 
                        <Avatar alt={comment.name} src={comment.imageUrl}>{comment.name.charAt(0)}</Avatar> 
                        <Typography variant="h6">{comment.name}</Typography>  
                      </Grid>
                    }))
                  */}
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