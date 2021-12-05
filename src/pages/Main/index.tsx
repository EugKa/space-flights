import React, { useEffect, useState } from 'react'
import { FlightsThunk, selectFlightsSlice } from '../../store/features/FlightsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { styled } from '@mui/material/styles';
import { Grid, Paper, Box, Pagination, Alert, CircularProgress } from '@mui/material';

import { IFlight } from '../../interface/flights';
import { CardFlight, Header } from '../../components';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '../../hooks/usePagination';

export const MainPage = () => {
   const [page, setPage] = useState(1);
   const dispatch = useAppDispatch()
   const navigate = useNavigate();

   const { status, filteredflightsData } = useAppSelector(selectFlightsSlice);

   const handleSelect = (id: number, ) => {
      navigate(`/full-info/${id}`);       
  }

   const Item = styled(Paper)(({ theme }) => ({
      textAlign: 'center',
      color: theme.palette.text.secondary,
   }));

   const PER_PAGE = 9;
   const count = Math.ceil(filteredflightsData.length / PER_PAGE);
   const pagRes = usePagination(filteredflightsData, PER_PAGE);
   const pageHandler = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      pagRes.jump(value)
   }

   useEffect(() => {
      dispatch(FlightsThunk())
      
   },[dispatch])

   if(status === 'reject') return (<Alert severity="error">Something went wrong, please try again later :(</Alert>)

   const noData = status !== 'loading' && filteredflightsData.length === 0 && (
      <Grid item lg={12} md={12} sm={12} xs={12}>
         <div>
            No Data
         </div>
      </Grid>
   )

   return (
      <div>
         <Header/>
         <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={2}>
               {noData}
               {status === 'loading'  ? (
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                     <CircularProgress/>
                  </Grid> 
               ) : pagRes.currentData().map((item:IFlight) => {  
                     return <Grid item key={item.id} lg={4} md={4} sm={6} xs={12}>
                        <Item>
                           <CardFlight 
                              data={item}
                              handleSelect={handleSelect}
                           />
                        </Item>
                     </Grid>
                  })
               }
               <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Pagination count={count} color="primary" page={page} onChange={pageHandler}/>
               </Grid>   
            </Grid>         
         </Box> 
      </div>
   )
}