import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const GetDashboardData = async () => {
    try{
        const response = await axiosInstance.get(`/Admin/dashboard`);
        //console.log(response.data);
        return response.data;
    }
    catch(err){
        if(err.response.status == 401){
            return err.response.status;
        }
        if(err.response.data){
            toast.error(err.response.data);
        }else{
            toast.error(err.message);
        }
    }
}

export default GetDashboardData