import { Container, Grid, Grow } from '@mui/material'
import { useState, FunctionComponent } from 'react'
import { IPost } from '../../Interfaces';
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import SearchInput from '../SearchBox/SearchInput';

interface HomeProps {
  editPost: (id: string) => any,
  deletePost: (id: string) => any,
  likePost: (id: string) => any,
  posts: IPost[],
  getOnePost:  (id: string) => any,
  filter:  (value: string) => any,
};


const Home: FunctionComponent<HomeProps> = ({editPost, deletePost, likePost, posts, getOnePost, filter}: HomeProps) => {

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
            {/* <Form /> */}
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home