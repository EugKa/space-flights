import React, { useState, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import './index.scss'
import { useAppDispatch } from '../../store/hooks';
import { searchByWord } from '../../store/features/FlightsSlice';



export const Header = () => {
   const [search, setSearch] = useState('');
   const dispatch = useAppDispatch();
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      dispatch(searchByWord(event.target.value))
   };
   return (
      <header>
         <TextField
            value={search}
            onChange={handleChange} 
            fullWidth
            id="outlined-basic" 
            label="Search" 
            variant="outlined"
            margin="normal"
            placeholder="Filter by keywords"
            InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   <SearchIcon />
                 </InputAdornment>
               ),
             }}
         />
      </header>
   )
}
