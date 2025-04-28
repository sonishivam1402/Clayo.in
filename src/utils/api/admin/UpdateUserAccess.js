import React from 'react'
import axios from 'axios';

const UpdateUserAccess = async (userId) => {
    //console.log(userId);
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Admin/updateUserAccess/${userId}`, null,{
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
            alert(err.response.data.title);
        }else{
            alert(err.message);
        }
    }
}

export default UpdateUserAccess