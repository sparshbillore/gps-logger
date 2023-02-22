import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import gpsDeviceService from './gpsDeviceService'
import { extractErrorMessage } from '../../utils'



export const getDetails = createAsyncThunk(
    'device/details',
    async (deviceId, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await gpsDeviceService.deviceDetails(token,deviceId)
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  




export const deviceDetailSlice = createSlice({
    name: 'getDetails',
    initialState: {
        Details : null
    },
    extraReducers: (builder) => {
      builder
        .addCase(getDetails.pending, (state) => {
          state.Details = null
        })
        .addCase(getDetails.fulfilled, (state, action) => {
          state.Details = action.payload
        })
    },
  })
  
  export default deviceDetailSlice.reducer