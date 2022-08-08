import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { FunctionComponent , useState } from 'react';
import { IPost } from '../../Interfaces';
import { useNavigate } from 'react-router';
import * as api from '../../api/apiClient'

interface PostProps {
 post: IPost,
 deletePost: (id: string) => any,
 likePost: (id: string) => any,
 getOnePost: (id: string) => any,
 getEditId: (id: string) => any,
};

const Post: FunctionComponent<PostProps> = ({post, deletePost, likePost, getOnePost, getEditId}: PostProps) => {
  const storage: any = localStorage.getItem('user');
  const user = useState(JSON.parse(storage));
  const siteUser = user[0]?.result._id; 
  let authorizedUser = false;
  const navigate = useNavigate();

  if(siteUser === post?.creator) authorizedUser= true;

  const handleEdit = (id: string)=>{
    getEditId(id);
  }

  const handleDelete = (id: string)=>{
    deletePost(id);
  }

  const handleLike= (id: string)=>{
    likePost(id);
  }

  const handleClick = async(id: string) => {
    try {
      const {data}= await api.fetchOnePost(id);
      navigate('/post', { state: data});
    } catch(e) {
      alert(`There has been an error: ${e}`);
    }
  }

  return (
   
    <Card sx={{padding: '0px', position: 'relative'}}>
    
      <CardMedia  component="img" sx={{height: "200px"}} image={post.selectedFile} title={post.title}/>
        <Grid container sx={{display: 'flex', position: 'absolute', top: '0%', padding: '10px',  backgroundColor: '#00000026', cursor: 'pointer'}}>
          <Grid item sx={{flex: '0.7'}}>
            <Typography sx={{color: 'white', fontWeight: 'bold', fontSize: '1.2rem '}} variant="h5" >{post.title}</Typography>
            <Typography variant="h6" sx={{color: 'white', fontWeight: 'bold', fontSize: '0.9rem '}}>{moment(post.createdAt).fromNow()}</Typography>
          </Grid>
          <Grid item sx={{flex: '0.3'}}>{(authorizedUser) ? (<Button size="small" sx={{color: 'white'}} onClick={()=>handleEdit(post._id)}> <EditIcon sx={{fontSize: '35px'}}/> </Button>) : null}
          </Grid>
        </Grid>
        <CardActionArea onClick={()=> handleClick(post._id)}>
          <Grid container sx= {{padding: '10px'}}>
            <Typography sx={{marginTop: '10px', fontSize: '18px', fontWeight: 'bold'}} variant="body2">{post.tag.map(t=> `#${t} ` )}</Typography>
          </Grid>
          <CardContent sx={{ padding: '10px', paddingTop: '0px'}}>
            <Typography sx={{padding: '0'}} variant="body2">{post.message.length > 20 ? ( post.message.slice(0,60) + "..." ): post.message}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{display: 'flex', justifyContent: 'space-between', padding: '0'}}>
          <Button sx={{color: user[0] ? "primary" : "gray"}} onClick={()=>handleLike(post._id)} color="primary"><ThumbUpOffAltIcon /> Like {post.likes.length} </Button>
          {(authorizedUser) ?
            (<Button  onClick={()=>handleDelete(post._id)}  color="primary"> <DeleteIcon/> Delete  </Button>)
            : null
          }
        </CardActions>
    </Card>
  )
}

export default Post;
