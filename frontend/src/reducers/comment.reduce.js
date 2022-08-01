export default function reduce  (comments=[], action){
  switch(action.type){
    case 'CREATE_COMMENT' : 
        console.log("Comment Reduce", action.payload)
        return [ ...action.payload];
    default:
      return comments;
  }
}