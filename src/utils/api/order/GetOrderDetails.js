import React from 'react'
import axios from 'axios'

const GetOrderDetails = async (userId) => {
  const token = localStorage.getItem('authToken');
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Order/GetOrderDetails/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`
    }
    });
    if (response) {
      console.log(response)
      return response.data;
    }
  } 
  catch (error) {
    if (error.response.data) {
      //console.log(error.response)
      alert(error.response.data[0].message)
    } else {
      alert(error.response.statusText + ", " + error.message);
    }
  }
}

export default GetOrderDetails