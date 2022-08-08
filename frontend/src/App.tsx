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
import { mainContext } from './Helper/context';



function App () { 
  const [ userContext, setUserContext ] = useState({});
  const [ currentPost, setCurrentPost ] = useState<any>();
  
  /*
    const getuser = async () => {
    const user = await getUserById()
    setUserContext(user)    
  }
  */
  const getUser = () => {
    const storage: any = localStorage.getItem('user');
    if (storage) setUserContext(JSON.parse(storage));
  }

  useEffect(() => {
    getUser();
  }, []);


  const getOnePost = async(id: string) => {
    try {
      const {data}= await api.fetchOnePost(id);
      setCurrentPost(data);
    } catch(e) {
      console.log(e)
    }
  };

  

  return (
    <mainContext.Provider value={{userContext, setUserContext}}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
          <Routes>
            <Route path="/" element = {<Home getOnePost={getOnePost}/>}/>
            <Route path="/auth"  element = {<Auth/>} />
            <Route path="/post"  element = {<PostDetail post={currentPost}/>} />  
          </Routes>
        </Container>
      </BrowserRouter>
    </mainContext.Provider>
  )
}

export default App;
