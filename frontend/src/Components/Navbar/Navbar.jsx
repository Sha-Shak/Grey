import { AppBar, Avatar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { logOutUser } from '../../actions/auth';
import logo from '../../Images/tlogo.png';

const Navbar = () => {
  const storage = localStorage.getItem('user')
  const [user, setUser] = useState(JSON.parse(storage)) 
  const navigate = useNavigate()
  
   const styles = {
    appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
      },
     brandText: {
      color: '#6d616f',
      textDecoration: 'none',
      fontSize: '2em',
      fontWeight: '700',
      marginTop: '7px',
      letterSpacing: '3px',

     } ,
     navBarImg: {
          marginLeft: '10px',
          marginTop: '5px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '400px',
      },
      profile: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  }
  useEffect(()=>{
    setUser(JSON.parse(storage))
  },[storage])

 
  const handleLogOut = (user)=>{
    // dispatch(logOutUser(user, navigate))
    user = null;
  }
  return (
     <AppBar sx={styles.appBar}  position="static" color="inherit">
      <Grid container sx={styles.brandContainer}>
        <img sx={styles.navBarImg} src={logo} alt="icon" height="60" />
        <Typography component = {Link} to="/" sx={styles.brandText} variant="h2" align="center">GREY</Typography>
      </Grid>
      <Toolbar sx={styles.toolbar}> 
        { user ? (
          <Grid container sx={styles.profile}>
            <Avatar sx={{marginRight: '10px'}} alt={user.result.name} >{user.result.name.charAt(0)}</Avatar>
        {/* <Typography sx={{marginRight: '10px'}} variant="h6">{user.result.email.split(' ')[0]}</Typography> */}
            <Button variant="contained" sx={{backgroundColor: '#dd0700'}} onClick={(e)=>{handleLogOut(user)}}>Log Out</Button>
          </Grid>
        ) : (
          <Button component={Link} to="/auth" variant="contained">Sign In</Button>
          ) }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar