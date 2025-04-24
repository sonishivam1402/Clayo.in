import React from 'react'
import axios from 'axios'

const GetDashboardData = async (id, roleId) => {
   const token = localStorage.getItem('authToken');
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/Admin/dashboard/${id}/${roleId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    }
    catch(err){
        console.log(err);
        if(err.response.data){
            alert(err.response.data);
        }else{
            alert(err.message);
        }
    }
}

export default GetDashboardData