import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const placeOrder = async (userId, email, cartId, cartItemIds) => {
    try{
        const response  = await axiosInstance.post(`/Order/PlaceOrder`,{userId, email, cartId, cartItemIds});
        return response;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
    
}

export default placeOrder