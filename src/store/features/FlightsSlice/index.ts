import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index';
import * as api from '../../../api'
import { IFlight } from '../../../interface/flights';
// import { IHourCastWeather } from '../../../interface';

interface dataState {
  flightsData: IFlight[];
  filteredflightsData: IFlight[]
  status: string;
  error?: boolean;
  searchWord: string;
}

const initialState: dataState = {
  flightsData: [],
  filteredflightsData: [],
  status: 'idle',
  error: false,
  searchWord: ''
}

export const FlightsThunk = createAsyncThunk(
   "@@FlightsSlice/fetchData",
   async () => {
    const data = await api.fetchFlights();
    return data;
   }
);


export const FlightsSlice = createSlice({
    name: '@@FlightsSlice',
    initialState,
    reducers: {
      searchByWord: (state, action: PayloadAction<string>) => {
        state.searchWord = action.payload
        state.filteredflightsData = state.searchWord === ''
        ?  state.flightsData
        :  state.flightsData.filter((item: IFlight) => 
                 item.title.toLocaleLowerCase().includes(state.searchWord.toLocaleLowerCase()) 
                 || item.summary.toLocaleLowerCase().includes(state.searchWord.toLocaleLowerCase()))
              .sort((a, b) => {
                 let left = a.title.toLowerCase().includes(state.searchWord.toLocaleLowerCase());
                 let right = b.title.toLowerCase().includes(state.searchWord.toLocaleLowerCase());
                 return left === right ? 0 : left < right ? 1 : -1
              });
      },
    },
    extraReducers: (builder) => {
      builder.addCase(FlightsThunk.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(FlightsThunk.fulfilled, (state, action) => {
        state.status = 'successed';
        state.flightsData = action.payload
        state.filteredflightsData = action.payload
      })    
      builder.addCase(FlightsThunk.rejected, 
        (state) => {
        state.status = 'failed';
        state.error = true;
      });
    }
})
export const { searchByWord } = FlightsSlice.actions
export const selectFlightsSlice = (state: RootState) => state.flights;
export default FlightsSlice.reducer;