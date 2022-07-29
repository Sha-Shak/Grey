import { combineReducers } from "redux";
import edit from './edit.reducer';
import onePost from './onePost.reducer';
import posts from './posts';

export default combineReducers({
  posts,
  edit,
  onePost

})