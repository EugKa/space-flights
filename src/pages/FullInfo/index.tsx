import React, { useEffect } from 'react'
import {  useAppDispatch, useAppSelector } from '../../store/hooks';
import { FlightsThunk, selectFlightsSlice } from '../../store/features/FlightsSlice'
import { Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { CardFullInfo } from '../../components';


export const FullInfoPage = () => {
   const { flightsData, status } = useAppSelector(selectFlightsSlice);
   const dispatch = useAppDispatch()
   const navigate = useNavigate();
   const { id } = useParams();

   useEffect(() => {
      if(status === 'idle') {
         dispatch(FlightsThunk())
      }
   },[dispatch, status])

   return (
      <div>
         {flightsData.filter(filtItem => filtItem.id === +id!)
            .map(item => <CardFullInfo key={item.id} data={item}/>)
         }
         <Button size="small" onClick={() => navigate(-1)}>Go to homepage</Button>
      </div>
   )
}
