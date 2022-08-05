import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useSelector } from 'react-redux';
import { IPost, RootState } from '../../Interfaces'

//he passed a setData, why?

export default function SearchInput({setData}) {

  console.log(setData, 'trying')
   const posts = useSelector((state: RootState) => state.posts) 
   const handleSearch = (value: string)=>{
    const filter = posts.filter((post: IPost) => post.title.toLowerCase().includes(value))
    setData(filter)
   }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Autocomplete id="free-solo-2-demo"
        disableClearable
        options={posts.map((option: IPost) => option.title)}
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
