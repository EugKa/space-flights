import { configureStore } from '@reduxjs/toolkit'
import FlightsSlice from './features/FlightsSlice'

export const store = configureStore({
  reducer: {
   flights: FlightsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch