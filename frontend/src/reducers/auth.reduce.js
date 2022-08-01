
  export default function reduce  (state={}, action){
    let payload = action.payload;
  switch(action.type){
    case 'CREATE_USER':
      localStorage.setItem('user', JSON.stringify({...payload}));
      console.log("create from reduce",payload);
      return state;
    case 'LOGIN_USER': 
      console.log("login from reduce",payload);
      localStorage.setItem('user', JSON.stringify({...payload}));
      console.log("action, state: ",payload, state)
      return {...state, payload};
    case 'LOGOUT_USER' : 
    console.log("logout");
    localStorage.clear()
    default:
      return state;
  }
}