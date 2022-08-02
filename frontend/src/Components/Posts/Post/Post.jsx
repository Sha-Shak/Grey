import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { deletePost, editPost, getOnePost, likePost } from '../../../actions/posts';


const Post = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storage = localStorage.getItem('user');
  const user = useState(JSON.parse(storage));
  const siteUser = user[0]?.result._id; 
  console.log("User is: ",siteUser, post.creator);
  let authorizedUser = false
  if(siteUser === post?.creator) authorizedUser= true; 
  
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
   
    <Card sx={{padding: '0px', position: 'relative'}}>
    
     <CardActionArea onClick={()=> handleClick(post._id)}>
      <CardMedia  component="img" sx={{height: "200px"}} image={post.selectedFile} title={post.title}/>
        <Grid container sx={{display: 'flex', position: 'absolute', top: '0%', padding: '10px',  backgroundColor: '#00000026', cursor: 'pointer'}}>
          <Grid item sx={{flex: '0.7'}}>
            <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: '1.5rem '}} variant="h5" >{post.title}</Typography>
            <Typography variant="h6" sx={{color: 'white', fontWeight: 'bold', fontSize: '1.2rem '}}>{moment(post.createdAt).fromNow()}</Typography>
          </Grid>
          <Grid item sx={{flex: '0.3'}}>{(authorizedUser) ? (<Button size="small" sx={{color: 'white'}} onClick={(e)=>handleEdit(post._id)}> <MoreHorizIcon sx={{fontSize: '40px'}}/> </Button>) : null}
          </Grid>
        </Grid>
        <Grid container sx= {{padding: '10px'}}>
          <Typography sx={{marginTop: '10px', fontSize: '18px', fontWeight: 'bold'}} variant="body2">{post.tag.map(t=> `#${t} ` )}</Typography>
        </Grid>
        <CardContent sx={{ padding: '10px', paddingTop: '0px'}}>
          <Typography sx={{padding: '0'}} variant="body2">{post.message.length > 20 ? ( post.message.slice(0,60) + "..." ): post.message}</Typography>
        </CardContent>
        </CardActionArea>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between', padding: '0'}}>
          <Button  onClick={(e)=>handleLike(post._id)} color="primary"><ThumbUpOffAltIcon /> Like {post.likeCount} </Button>
          {(authorizedUser) ?
            (<Button onClick={(e)=>handleDelete(post._id)}  color="primary"> <DeleteIcon/> Delete  </Button>)
            : null
          }
        </CardActions>
    </Card>
  )
}

export default Post