import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const GetDashboardData = async (id, roleId) => {
    try{
        const response = await axiosInstance.get(`/Admin/dashboard/${id}/${roleId}`);
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

export default GetDashboardData