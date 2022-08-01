import * as api from '../api/apiClient';

export const createUser= (formData, navigate)=>  async (dispatch)=>{
  console.log("action create", formData)
  try{
    const {data} = await api.createUser(formData);
     dispatch({type: 'CREATE_USER', payload: data});
    console.log(formData)
    navigate('/')
}catch(e){
    console.log(e);
  }
}
export const logInUser = (formData, navigate) => async(dispatch)=>{

  console.log("action login")
  try{
    const {data} = await api.logInUser(formData);
    dispatch({type: 'LOGIN_USER', payload: data})
    console.log(formData)
    navigate('/')
  }catch(e){
    console.log(e); 
  }
}
export const logOutUser = (user, navigate) =>(dispatch)=>{

  console.log("action logout", user)
  try{
    dispatch({type: 'LOGOUT_USER', payload: user})
    navigate('/auth')
  }catch(e){
    console.log(e); 
  }
}