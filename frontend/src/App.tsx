import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom';
import * as api from './api/apiClient';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import PostDetail from './Components/Posts/PostDetail/PostDetail';
import { AxiosResponse } from "axios";
import { IPost } from './Interfaces';



function App () { 
  const [ data, setData ] = useState([]);
  const [ posts, setPosts ] = useState<any>([]); //me toco recurrir a any
  const [ currentPost, setCurrentPost ] = useState<any>();
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
 
  const getOnePost = async(id: string) => {
    console.log('geeeeee')
    try {
      const {data}= await api.fetchOnePost(id);
      console.log(data, 'la data')
      setCurrentPost(data);
    } catch(e) {
      console.log(e)
    }
  }

  const filter = (value: string) => {
    const filter = totalPosts.filter((post: IPost) => post.title.toLowerCase().includes(value));
    setPosts(filter);
  }

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Home editPost={editPost} deletePost={deletePost} likePost={likePost} posts={posts} getOnePost={getOnePost} filter={filter}/>} />
          {/* <Route path="/auth"  element = {<Auth/>} /> */}
          <Route path="/post"  element = {<PostDetail post={currentPost}/>} />  
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App;
