import React from 'react'
import axios from 'axios'

const GetOrderDetails = async (userId) => {
  try{
    const response = await axios.get(`/api/Order/GetOrderDetails/${userId}`) ;
    if(response){
        return response;
    }
  }catch(err){
    console.log(err);
  }
}

export default GetOrderDetails