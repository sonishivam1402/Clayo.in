import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const GetCartItem = async (userId,cartId) => {
    try{
        const response = await axiosInstance.get(`/cart/${userId}/${cartId}`);
        //console.log(response);
        return response.data;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            toast.error(error.response.data[0].message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
    
}

export default GetCartItem


