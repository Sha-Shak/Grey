export default function reduce  (onePost={}, action){
  switch(action.type){
    case 'FETCH_ONE' :
      console.log("reduce fetch", action.payload)
      return action.payload;
      case 'CREATE_COMMENT' : 
        console.log("Comment Reduce", action.payload)
        return  action.payload;
    default:
      return onePost;
  }
}