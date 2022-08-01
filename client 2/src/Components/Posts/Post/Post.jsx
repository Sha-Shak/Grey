import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { deletePost, editPost, getOnePost, likePost } from '../../../actions/posts';


const Post = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleEdit = (id)=>{
    dispatch(editPost(id));
  }
  const handleDelete = (id)=>{
    console.log(" deleted id: ", id)
    dispatch(deletePost(id))
  }
  const handleLike= (id)=>{
    console.log("like", id)
    dispatch(likePost(id))
  }
  const handleClick =(id )=>{
    dispatch(getOnePost(id,  navigate ));
    
    
  }
  return (
    <Card >
      <CardMedia  component="img" sx={{
        height: "200px"
      }} image={post.selectedFile} title={post.title}/>
      <div>
      <Typography variant="h6">{post.creator}</Typography>
      <Typography variant="h6">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div>
      <Button size="small" onClick={(e)=>handleEdit(post._id)}> <MoreHorizIcon fontSize= "default" /> </Button>
      </div>
      <div>
      <Typography variant="body2">{post.tag.map(t=> `#${t} ` )}</Typography>
      </div>
      
      <CardContent>
      <Typography variant="h5" onClick={()=> handleClick(post._id)}>{post.title}</Typography>
      <Typography variant="body2">{post.message.length > 20 ? ( post.message.slice(0,60) + "..." ): post.message}</Typography>
      </CardContent>
      <CardActions>
        <Button  onClick={(e)=>handleLike(post._id)} color="primary"><ThumbUpOffAltIcon /> Like {post.likeCount} </Button>
        <Button onClick={(e)=>handleDelete(post._id)}  color="primary"><DeleteIcon /> Delete  </Button>
      </CardActions>

    </Card>
  )
}

export default Post