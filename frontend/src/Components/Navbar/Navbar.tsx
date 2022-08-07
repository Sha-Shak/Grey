import { AppBar, Avatar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Images/tlogo.png';
import { styles } from './styles.ts';

const Navbar = () => {
  const storage = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(storage));
  const navigate = useNavigate();
  
  useEffect(()=>{
    setUser(JSON.parse(storage));
  },[storage])

 
  const handleLogOut = (user) => {
    try {
      localStorage.clear();
      navigate('/auth')
    } catch(e) {
      console.log(e); 
    }
    
    user = null;
  }

  return (
     <AppBar sx={styles.appBar}  position="static" color="inherit">
      <Grid container sx={styles.brandContainer}>
        <img style={styles.navBarImg} src={logo} alt="icon" height="60" />
        <Typography component = {Link} to="/" sx={styles.brandText} variant="h2" align="center">GREY</Typography>
      </Grid>
      <Toolbar sx={styles.toolbar}> 
        { user ? (
          <Grid container sx={styles.profile}>
            <Avatar sx={{marginRight: '10px'}} alt={user.result.name} >{user.result.name.charAt(0)}</Avatar>
        {/* <Typography sx={{marginRight: '10px'}} variant="h6">{user.result.email.split(' ')[0]}</Typography> */}
            <Button variant="contained" sx={{backgroundColor: '#dd0700'}} onClick={() => {handleLogOut(user)}}>Log Out</Button>
          </Grid>
        ) : (
          <Button component={Link} to="/auth" variant="contained">Sign In</Button>
          ) }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar