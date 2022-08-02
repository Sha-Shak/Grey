import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function SearchInput({setData}) {
   const posts = useSelector((state)=>state.posts) 
   const handleSearch = (value)=>{
     console.log(value);
    const filter = posts.filter(post=> post.title.toLowerCase().includes(value))
    setData(filter)
   }
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete id="free-solo-2-demo"
        disableClearable
        options={posts.map((option) => option.title)}
        renderInput={(params) => (
          <TextField  name= "search"  onChange={(e)=> handleSearch(e.target.value.toLowerCase())}
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
