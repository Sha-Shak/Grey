import { AppBar, Avatar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';

const Navbar = () => {
  const storage: any = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(storage));
  const navigate = useNavigate();

  useEffect(()=>{
    setUser(JSON.parse(storage));
  },[storage])

 
  const handleLogOut = () => {
    try {
      localStorage.clear();
      setUser(null);
      navigate('/auth');
    } catch(e) {
      alert(`There has been an error: ${e}`);
    }
  }

  return (
     <AppBar sx={styles.appBar}  position="static" color="inherit">
      <Grid container sx={styles.brandContainer}>
        <img style={styles.navBarImg} src={require('../../Images/tlogo.png')} alt="icon" height="60" />
        <Typography component = {Link} to="/" sx={styles.brandText} variant="h2" align="center">GREY</Typography>
      </Grid>
      <Toolbar sx={styles.toolbar}> 
        { user ? (
          <Grid container sx={styles.profile}>
            <Avatar sx={{marginRight: '10px'}} alt={user.result.name} >{user.result.name.charAt(0)}</Avatar>
            <Button variant="contained" style={{backgroundColor: '#dd0700'}} onClick={handleLogOut}>Log Out</Button>
          </Grid>
        ) : (
          <Button component={Link} to="/auth" variant="contained">Sign In</Button>
          ) }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;