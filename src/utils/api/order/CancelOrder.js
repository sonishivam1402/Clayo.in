import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const CancelOrder = async (orderId) => {
    try{
        const response = await axiosInstance.delete(`/order/CancelOrder`,{
            params:{
                orderId
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