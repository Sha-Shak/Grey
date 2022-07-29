import { AppBar, Container, Grid, Grow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './actions/posts';
import Form from './Components/Form/Form';
import Posts from './Components/Posts/Posts';
import logo from './Images/tlogo.png';
const App = () => {
  const dispatch = useDispatch();
  // const deleteId = useSelector(state=> state.posts);
  const posts = useSelector((state)=> state.posts);
  useEffect(()=>{
   dispatch(getPosts());
  },[])


  const styles = {
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 15,
        margin: '30px 0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 50px',
      }
  }

  return (
    <Container maxWidth="lg">
      <AppBar sx={styles.appBar}  position="static" color="inherit">
        <Typography sx={{
        color: 'rgba(0,183,225,1)',
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: '700',
        }} variant="h2" align="center">Grey</Typography>
        <img sx={{
          marginLeft: '10px',
          marginTop: '5px',
        }} src={logo} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts  />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  
  )
}

export default App