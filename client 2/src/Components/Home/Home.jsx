import { Container, Grid, Grow } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import SearchInput from '../SearchBox/SearchInput'

const Home = () => {
  
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getPosts());
  },[dispatch])
  return (
     <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
           <Grid item xs={12} sm={12}>
            <SearchInput/>
           </Grid>
            <Grid item xs={12} sm={7}>
              <Posts  />
            </Grid>
            <Grid item xs={12} sm={4} >
            <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home