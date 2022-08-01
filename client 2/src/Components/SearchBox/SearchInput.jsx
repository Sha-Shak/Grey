import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchValue } from '../../actions/posts';

export default function SearchInput() {
   const posts = useSelector((state)=>state.posts) 
  //  console.log("values searchinput", posts)
   const dispatch = useDispatch()
   const handleSearch = (value)=>{
    //const value = e.target.search.value;
    // console.log(value);
    dispatch(searchValue(value))
   }
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
     
        id="free-solo-2-demo"
        disableClearable
        options={posts.map((option) => option.title)}
        renderInput={(params) => (
          <TextField  name= "search"  onChange={(e)=> handleSearch(e.target.value)}
            {...params}
            label="Search here..."
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}
