import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as api from './api/apiClient';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import PostDetail from './Components/PostDetail/PostDetail';
import { mainContext } from './Helper/context';



function App () { 
  const [ userContext, setUserContext ] = useState({});
  
  const getUser = () => {
    const storage: any = localStorage.getItem('user');
    if (storage) setUserContext(JSON.parse(storage));
  }

  useEffect(() => {
    getUser();
  }, []);
  

  return (
    <mainContext.Provider value={{userContext, setUserContext}}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
          <Routes>
            <Route path="/" element = {<Home/>}/>
            <Route path="/auth"  element = {<Auth/>} />
            <Route path="/post"  element = {<PostDetail/>} />  
          </Routes>
        </Container>
      </BrowserRouter>
    </mainContext.Provider>
  )
}

export default App;
