import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const AddOrUpdateCart = async (userId,cartId,productId,quantity) => {
    try{
        const response  = await axiosInstance.post(`/Cart/addOrUpdate`,{userId, cartId, productId, quantity});
        //console.log(response.data);
        return response.data;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
    
}

export default AddOrUpdateCart