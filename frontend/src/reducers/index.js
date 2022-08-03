import { combineReducers } from "redux";
import auth from './auth.reduce';
import edit from './edit.reducer';
import onePost from './onePost.reducer';
import posts from './posts';

export default combineReducers({
  posts,
  edit,
  auth,
  onePost,
 
})