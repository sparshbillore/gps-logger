import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import gpsDeviceService from './gpsDeviceService'
import { extractErrorMessage } from '../../utils'



export const getDevices = createAsyncThunk(
    'gpsSummary/getAllDevices',
    async (args, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await gpsDeviceService.gpsSummary(token, args.query, args.page, args.sortBy, args.sortOrder )
      } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
      }
    }
  )
  




export const gpsSummarySlice = createSlice({
    name: 'getSummary',
    initialState: {
        deviceList : null
    },
    extraReducers: (builder) => {
      builder
        .addCase(getDevices.pending, (state) => {
          state.deviceList = null
        })
        .addCase(getDevices.fulfilled, (state, action) => {
          state.deviceList = action.payload.paginatedData
          state.currentPage = action.payload.page
          state.totalPages = action.payload.totalPages
          state.totalcount = action.payload.totalcount
          
        })
    },
  })
  
  export default gpsSummarySlice.reducer