import axios from 'axios';

const url = 'http://localhost:8080';
axios.interceptors.request.use((req: Request)=>{
  const token = localStorage.getItem('user')
  if(token) req.headers.Authorization = `Bearer ${JSON.parse(token).token}`
  return req;
}, (e)=>{return Promise.reject(e)});

export const fetchPosts=()=> axios.get(`${url}/posts`);
export const fetchOnePost = (id)=> axios.get(`${url}/posts/${id}`);
export const createPost = (newPost)=> axios.post(`${url}/posts`, newPost);
export const updatePost = (id, newPost)=> axios.patch(`${url}/posts/${id}`, newPost);
export const deleteOnePost = (id)=> axios.delete(`${url}/posts/${id}`);
export const likePost = (id)=> axios.patch(`${url}/posts/${id}/likePost`);
export const createComment = (comment, postId)=> axios.patch(`${url}/posts/${postId}/comment`, {comment, postId});
//user
export const logInUser = (formData) => axios.post(`${url}/user/signin`, formData);
export const createUser = (formData) => axios.post(`${url}/user/signup`, formData);
