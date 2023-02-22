import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import gpsSummaryReducer from '../features/gpsData/gpsSummarySlice';
import deviceDetailReducer from '../features/gpsData/deviceDetailSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    gps: gpsSummaryReducer,
    deviceDetails : deviceDetailReducer
  },
});
