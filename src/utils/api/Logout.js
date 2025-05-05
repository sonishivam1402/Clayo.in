import React from 'react'
import axios from 'axios'

const Logout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    const refreshToken = localStorage.getItem('refreshToken');
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auth/logout`,{userId,refreshToken});
        return response.data;
    }catch(error){
        console.log(error);
        if(error.response.data){
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
}

export default Logout