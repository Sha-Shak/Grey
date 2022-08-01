export default function reduce  (posts=[], action){
  switch(action.type){
    case 'FETCH_ALL':
      return action.payload.data;
    case 'CREATE':
      return [...posts, action.payload];
    case 'EDIT_DONE' : 
      return posts.map(post=> {
        let id  = action.payload._id;
        let data = action.payload; 
        if(post._id === id){
          return {...data }
        }
        return post;
      });
    case 'DELETE' : 
      return posts.filter(post=> post._id !== action.payload)
    case 'LIKE' :
     
      let data = action.payload; 
      console.log("reducer" , data);
      return posts.map(post=> {
        if(post._id === data._id){
          console.log("matched", post);
          return data 
        } else return post
      }

      ) 
      case 'SEARCH' : 
      console.log("reduce search", action.payload)
      return posts.filter(post=>post.title === action.payload) 
      
    default:
      return posts;
  }
}