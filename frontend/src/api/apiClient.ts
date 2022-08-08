import axios from 'axios';
import { IPost, ILoginUser, INewUser } from '../Interfaces';


const url = 'http://localhost:8080';

axios.interceptors.request.use((req)=>{
  const token = localStorage.getItem('user')
  if (token) req.headers.Authorization = `Bearer ${JSON.parse(token).token}`
  return req;
}, (e)=>{return Promise.reject(e)});

export const fetchPosts = () => axios.get<IPost[]>(`${url}/posts`).then((response) => response);
export const fetchOnePost = (id: string)=> axios.get<IPost>(`${url}/posts/${id}`).then((response) => {
  return response;
});

export const createPost = (newPost: IPost)=> axios.post(`${url}/posts`, newPost).then((response) => response);
export const updatePost = (id: string, newPost: any)=> axios.patch(`${url}/posts/${id}`, newPost).then((response) => response);
export const deleteOnePost = (id: string)=> axios.delete(`${url}/posts/${id}`);
export const likePost = (id: string)=> axios.patch(`${url}/posts/${id}/likePost`);
export const createComment = (comment: string, postId: string)=> axios.patch(`${url}/posts/${postId}/comment`, {comment, postId});

//user
export const logInUser = (formData: ILoginUser) => axios.post<ILoginUser>(`${url}/user/signin`, formData).then((response) => response);
export const createUser = (formData: INewUser) => axios.post<INewUser>(`${url}/user/signup`, formData).then((response) => response);