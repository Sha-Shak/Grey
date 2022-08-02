import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Container, Grid, Grow, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createUser, logInUser } from '../../actions/auth';
import CustomInput from './Input';

const initialState= { firstName: '', email:'', lastName: '', password: '', confirmPassword: ''}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleChange= (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(isSignUp){
      console.log("form",formData)
      dispatch(createUser(formData, navigate));
     
    } else {
      //cleaning data cause for login other input field is null
      const {email, password} = formData;
      dispatch(logInUser({email, password}, navigate))
    }
    
  }
  const switchMode=()=>{
    console.log(" switched", isSignUp , showPassword)
    setIsSignUp(prevIsSignUp=> !prevIsSignUp);
    setShowPassword(false)
    console.log(" ch switched", isSignUp, showPassword)
  }
  const styles = {
    names: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0 15px ',
      justifyContent: 'center',

    },
    header: {
      marginBottom: '20px',
      borderBottom: 'thin solid lightgray', 
      textAlign: 'center'
    },
    center:{
      textAlign: 'center',
      position: 'absolute', 
      left: '35%', 
      top: '20%',
      transform: 'translate(-50%, -50%)'
    },
    formInput: {
      padding: '35px',
      margin: '10%'
    },
    logInPaper:{
      padding: '30px',
      width: '30vw',
      height: 'auto'
    }
   

    
  }
  return (
    <Container>
    <Grow in>
      <Paper sx={{...styles.center, ...styles.logInPaper}}>
        <Avatar sx={{left:"44%"}}>
          <LockIcon />
        </Avatar>
        <Typography sx={styles.header} variant= "h5"> {isSignUp ? 'Sign Up' : 'Sign In'} </Typography>
        <form  onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp ? (
                <Grid item sx={{display: 'flex'}}>
                  <CustomInput name="firstName" label="First Name" handleChange={handleChange}  half />
                  <CustomInput name="lastName" label="Last Name" handleChange={handleChange}  half />
                </Grid>
               ) : null
            }
            <CustomInput type="email" name="email" label="Email Address" handleChange={handleChange}/>
            <CustomInput type={showPassword ? "text" : "password"} name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
            {

              isSignUp ?<CustomInput type={showPassword ? "text" : "password"} name="confirmPassword" label="Confirm Password" handleChange={handleChange} handleShowPassword={handleShowPassword} /> : null

            }
          </Grid>
           <Button sx={{marginTop: '10px'}} type="submit"  variant="contained" color="primary">{isSignUp ? "Sign Up" : "Sign In" }</Button>
           <Grid container sx={{textAlign: 'center'}}>
           <Grid item sx={{textAlign: 'center'}}>
           <Button onClick={switchMode}> {isSignUp ? "Already Have an account? Sign In" : "Don't have an account? Sign Up" }</Button>
           </Grid>
           </Grid>
        </form>
      </Paper>
    </Grow>
    </Container>
  )
}

export default Auth