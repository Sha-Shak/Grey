import { Container, Grid, Grow } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { IPost } from '../../Interfaces';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import SearchInput from '../SearchBox/SearchInput';
import * as api from '../../api/apiClient';

interface IHomeProps {
  getOnePost: (id: string) => any
}

const Home: FunctionComponent<IHomeProps> = ({getOnePost}: IHomeProps) => {

  const [ posts, setPosts ] = useState<any>([]); //me toco recurrir a any
  const [ totalPosts, setTotalPosts ] = useState<any>([]);

  useEffect(() => {
    const getPosts = async() => {
      try {
        const {data} = await api.fetchPosts();
        setPosts(data);
        setTotalPosts(data);
      } catch (e) {
        alert(`There has been an error: ${e}`)
      }
    }

    getPosts();
  }, []);

  const editPost = async(id: string) => {
    // try {
    //   const {data} = await api.updatePost(id, post);
    //    console.log("response is: ", data);
    // } catch (e) {
    //   alert(`There has been an error: ${e}`)
    // }
    return id;
  }

  const deletePost = async(id: string) => {
    try {
      const res = await api.deleteOnePost(id);
    } catch (e) {
      alert(`There has been an error: ${e}`)
    }
  }

  const likePost = async(id: string)=>{
    try {
      const {data} = await api.likePost(id)
    } catch (e) {
      alert(`There has been an error: ${e}`)
    }
  }
 

  const filter = (value: string) => {
    const filter = totalPosts.filter((post: IPost) => post.title.toLowerCase().includes(value));
    setPosts(filter);
  }

  const createPost = async(postData: any) => {
    try {
      const {data} = await api.createPost(postData);
      setPosts((prevState: any) => [...prevState, data]);
      setTotalPosts((prevState: any) => [...prevState, data]);
    } catch(e) {
      console.log(e)
    }
  } 

  return (
     <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
           <Grid item xs={12} sm={12}>
            <SearchInput posts={posts} filter={filter}/>
           </Grid>
            <Grid item xs={12} sm={7}>
              <Posts editPost={editPost} deletePost={deletePost} likePost={likePost} posts={posts} getOnePost={getOnePost}/>
            </Grid>
            <Grid item xs={12} sm={5} >
            <Form createPost={createPost}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home