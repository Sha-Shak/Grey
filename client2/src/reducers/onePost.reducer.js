export default function reduce  (onePost={}, action){
  switch(action.type){
    case 'FETCH_ONE' :
      return action.payload.data;
    default:
      return onePost;
  }
}