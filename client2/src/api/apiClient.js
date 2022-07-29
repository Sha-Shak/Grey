import axios from 'axios';

const url = 'http://localhost:8080/posts';

export const fetchPosts=()=> axios.get(url);
export const createPost = (newPost)=> axios.post(url, newPost);
export const updatePost = (id, newPost)=> axios.patch(`${url}/${id}`, newPost);
export const deleteOnePost = (id)=> axios.delete(`${url}/${id}`);

//prolly unnecessary
export const fetchOnePost = (id)=> axios.get(`${url}/${id}`);