export default function reduce  (id=null, action){
  switch(action.type){
    case 'EDIT':
      return action.payload;
    case 'EDIT_DONE': 
      return null;
    default:
      return id;
  }
}