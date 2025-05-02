import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const AddOrUpdateCart = async (userId,cartId,productId,quantity) => {
    const token = localStorage.getItem('authToken');
    try{
        const response  = await axios.post(`${import.meta.env.VITE_API_URL}/Cart/addOrUpdate`,{userId, cartId, productId, quantity},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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