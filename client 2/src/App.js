import { Container } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import PostDetail from './Components/Posts/PostDetail/PostDetail';
const App = () => {
  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/auth"  element = {<Auth/>} />
        <Route path="/post"  element = {<PostDetail/>} />
        
     </Routes>
    </Container>
    </BrowserRouter>
  )
}

export default App