import { Container, Grid, Grow } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { IPost } from '../../Interfaces';
import Form from '../Form/Form';
import Posts from '../PostsList/Posts';
import SearchInput from '../SearchBox/SearchInput';
import * as api from '../../api/apiClient';


const Home: FunctionComponent = () => {

  const [ posts, setPosts ] = useState<IPost[]>([]);
  const [ totalPosts, setTotalPosts ] = useState<IPost[]>([]);
  const [ editPostId, setEditPostId ] = useState<string>('');

  const getPosts = async() => {
    try {
      const {data} = await api.fetchPosts();
      setPosts(data);
      setTotalPosts(data);
    } catch (e) {
      alert(`There has been an error: ${e}`);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const getEditId = (id: string)=>{
    setEditPostId(id);
  }

  const editPost = async(post: any) => {
    try {
      const {data} = await api.updatePost(editPostId, post);
    } catch (e) {
      alert(`There has been an error: ${e}`);
    }
  }

  const deletePost = async(id: string) => {
    try {
      await api.deleteOnePost(id);
      let filteredArray = posts.filter((post: IPost) => post._id !== id);
      setPosts(filteredArray);
    } catch (e) {
      alert(`There has been an error: ${e}`);
    }
  }

  const likePost = async(id: string)=>{
    try {
      const {data} = await api.likePost(id);
      setPosts((prevState: IPost[]) => {
        const updatedPosts = prevState.map((post: IPost) => {
          if(post._id === data._id) return data
          return post
        })
        return updatedPosts;
      })

    } catch (e) {
      alert(`There has been an error: ${e}`);
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
      alert(`There has been an error: ${e}`);
    }
  }

  const getOnePost = async(id: string) => {
    try {
      await api.fetchOnePost(id);
    } catch(e) {
      alert(`There has been an error: ${e}`);
    }
  };


  return (
     <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
           <Grid item xs={12} sm={12}>
            <SearchInput posts={posts} filter={filter}/>
           </Grid>
            <Grid item xs={12} sm={7}>
              <Posts deletePost={deletePost} likePost={likePost} posts={posts} getOnePost={getOnePost} getEditId={getEditId}/>
            </Grid>
            <Grid item xs={12} sm={5} >
            <Form posts={posts} createPost={createPost} editPost={editPost} editId={editPostId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home;