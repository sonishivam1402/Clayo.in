import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const UserById = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/User/Id/${id}`,null,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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