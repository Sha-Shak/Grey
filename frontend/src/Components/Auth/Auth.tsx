import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Button, Container, Grid, Grow, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomInput from './Input';
import * as api from '../../api/apiClient';
import { styles } from './styles';

const initialState= { firstName: '', email:'', lastName: '', password: '', confirmPassword: ''};

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    if(isSignUp){
      try {
        const {data} = await api.createUser(formData);
        localStorage.setItem('user', JSON.stringify({...data}));
        navigate('/');
      } catch(e) {
        alert(`There has been an error: ${e}`);
      }
     
    } else {
      const {email, password} = formData;
      try {
        const {data} = await api.logInUser({email, password});
        localStorage.setItem('user', JSON.stringify({...data}));
        navigate('/');
      } catch(e) {
        alert(`There has been an error: ${e}`);
      }
    } 
  }


  const switchMode = () => {
    setIsSignUp(prevIsSignUp=> !prevIsSignUp);
    setShowPassword(false);
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
                <Grid item sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <CustomInput  name="firstName" label="First Name" handleChange={handleChange}  half={true}/>
                  <CustomInput name="lastName" label="Last Name" handleChange={handleChange}  half={true}/>
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
           <Grid item sx={{position: 'absolute', right: '0%', padding: '20px', paddingTop: '5px', paddingBottom: '10px' }}>
           <Button onClick={switchMode}> {isSignUp ? "Already Have an account? Sign In" : "Don't have an account? Sign Up" }</Button>
           </Grid>
           </Grid>
        </form>
      </Paper>
    </Grow>
    </Container>
  )
}

export default Auth;
