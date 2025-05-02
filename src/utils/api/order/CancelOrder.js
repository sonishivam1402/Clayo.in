import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const CancelOrder = async (orderId) => {
    const token = localStorage.getItem('authToken');
    try{
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/order/CancelOrder`,{
            params:{
                orderId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        //console.log(response)
        return response.data;
    }
    catch(error){
        if(error.response.data){
            //console.log(error.response)
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }  
    }

export default CancelOrder