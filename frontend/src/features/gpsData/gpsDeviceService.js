import axios from 'axios'

const API_URL = '/api/devices/'


const gpsSummary = async (token, query, page, sortBy, sortOrder) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(API_URL + `summary?q=${query}&page=${page}&sortBy=${sortBy}&orderBy=${sortOrder}`, config)
    
   console.log(response.data)
    return response.data
  }

const deviceDetails = async (token, deviceId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  

  const response = await axios.get(API_URL + `${deviceId}`, config)

  return response.data
}


  const gpsDeviceService = {
    gpsSummary,
    deviceDetails
  }


  export default gpsDeviceService