import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const GetAllOrderStatus = async () => {
    try{
        const response = await axiosInstance.get(`/Admin/getAllOrderStatus`);
        //console.log(response.data);
        return response.data;
    }
    catch(err){
        //console.log(err);
        if(err.response.data){
            toast.error(err.response.data);
        }else{
            toast.error(err.message);
        }
    }
}

export default GetAllOrderStatus