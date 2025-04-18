import React from 'react'
import axios from 'axios';

const UserById = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.post(`/api/User/Id/${id}`,null,{
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
            alert(err.response);
        }
    }
   
}

export default UserById