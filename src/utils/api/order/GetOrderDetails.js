import React from 'react'
import axios from 'axios'

const GetOrderDetails = async (userId) => {
  try {
    const response = await axios.get(`/api/Order/GetOrderDetails/${userId}`);
    if (response) {
      return response.data;
    }
  } 
  catch (error) {
    if (error.response.data) {
      //console.log(error.response)
      alert(error.response.data.message)
    } else {
      alert(error.response.statusText + ", " + error.message);
    }
  }
}

export default GetOrderDetails