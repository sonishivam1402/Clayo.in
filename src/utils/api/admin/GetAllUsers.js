import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const GetAllUsers = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
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
            toast.error(err.response.data);
        }else{
            toast.error(err.message);
        }
    }
}

export default GetAllUsers