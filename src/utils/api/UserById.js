import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from './axiosInstance';

const UserById = async (id) => {
    try {
        const response = await axiosInstance.post(`/User/Id/${id}`,null)
        //console.log(response)
        if(response){
            return response.data;
        }
    
    } catch (err) {
        if(err.response){
            toast.error(err.response.data.message);
        }
    }
   
}

export default UserById