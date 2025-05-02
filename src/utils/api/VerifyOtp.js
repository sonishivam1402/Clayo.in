import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const VerifyOtp = async (otp, userId) => {
    console.log(userId);
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/User/VerifyUser`,{otp, userId})
        if(response){
            return response.data;
        }
    
    } catch (err) {
        if(err.response){
            toast.error(err.response.data.message);
        }
    }
}

export default VerifyOtp