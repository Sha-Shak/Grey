import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

interface CustomInputProps {
  half?: boolean,
  handleChange?: (e: any) => any,
  type?: string,
  label?: string, 
  handleShowPassword?: (e: any) => any, 
  name?: string
};

const Input = ({half, handleChange, type, label, handleShowPassword, name}: CustomInputProps) => {

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField name={name} 
      onChange={handleChange}
      variant= "outlined"
      required
      fullWidth 
      label={label}
      autoFocus
      type= {type}
      InputProps={name === 'password' || name ==='confirmPassword' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        } : undefined}
    />
    </Grid>
  )
}

export default Input