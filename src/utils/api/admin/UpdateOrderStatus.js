import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const UpdateOrderStatus = async (orderItemId,status) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Admin/updateOrderStatus/${orderItemId}/${status}`, null,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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