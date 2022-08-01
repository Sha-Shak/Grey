import { AppBar, Avatar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOutUser } from '../../actions/auth';
import logo from '../../Images/tlogo.png';

const Navbar = () => {
  const storage = localStorage.getItem('user')
  const [user, setUser] = useState(JSON.parse(storage)) 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
   const styles = {
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 15,
        margin: '30px 0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 50px',
      },
     brandText: {
      color: 'rgba(0,183,225,1)',
      textDecoration: 'none',
      fontSize: '2em',
      fontWeight: '700',
     } ,
     navBarImg: {
          marginLeft: '10px',
          marginTop: '5px',
        }
  }
  useEffect(()=>{
    setUser(JSON.parse(storage))
  },[storage])
  const handleLogOut = (user)=>{
    dispatch(logOutUser(user, navigate))
    user = null;
  }
  return (
     <AppBar sx={styles.appBar}  position="static" color="inherit">
     <div className="brandContainer">
        <Typography component = {Link} to="/" sx={styles.brandText} variant="h2" align="center">Grey</Typography>
        <img sx={styles.navBarImg} src={logo} alt="icon" height="60" />
        </div>
        <Toolbar> 
          { user ? (
            <Grid container sx={{display: "flex"}}>
            <Avatar alt={user.existingUser.name} src={user.existingUser.imageUrl}>{user.existingUser.name.charAt(0)}</Avatar>
            <Typography variant="h6">{user.existingUser.name.split(' ')[0]}</Typography>
            <Button variant="contained" color="secondary" onClick={(e)=>{handleLogOut(user)}}>Log Out</Button>
            </Grid>
          ) : (
            <Button component={Link} to="/auth" variant="contained">Sign In</Button>
          ) }
        </Toolbar>
      </AppBar>
  )
}

export default Navbar