import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = async(email) => {
    console.log(email);
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auth/VerifyEmail`,{email})
        if(response){
            return response.data;
        }
    
    } catch (err) {
        if(err.response){
            toast.error(err.response.data.message);
        }
    }
}

export default VerifyEmail