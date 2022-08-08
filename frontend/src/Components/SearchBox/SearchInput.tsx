import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { IPost } from '../../Interfaces'

interface SearchProps {
  posts: IPost[],
  filter: (value: string) => any
}

export default function SearchInput({posts, filter}: SearchProps) {

   const handleSearch = (value: string)=>{
    filter(value);
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
