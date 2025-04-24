import React from 'react'
import axios from 'axios';

const CancelOrder = async (orderId) => {
    const token = localStorage.getItem('authToken');
    try{
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/order/CancelOrder`,{
            params:{
                orderId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        return response.data;
    }
    catch(error){
        if(error.response.data){
            console.log(error.response)
            alert(error.response.data.message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }  
    }

export default CancelOrder