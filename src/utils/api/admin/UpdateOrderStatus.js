import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const UpdateOrderStatus = async (orderItemId,status) => {
    try {
        const response = await axiosInstance.post(`/Admin/updateOrderStatus/${orderItemId}/${status}`, null)
        //console.log(response.data)
        return response.data;
    }
    catch (err) {
        //console.log(err);
        if(err.response.data){
            toast.error(err.response.data.title);
        }else{
            toast.error(err.message);
        }
    }
}

export default UpdateOrderStatus