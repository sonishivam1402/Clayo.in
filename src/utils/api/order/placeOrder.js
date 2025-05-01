import React from 'react'
import axios from 'axios'

const placeOrder = async (userId, email, cartId, cartItemIds) => {
    const token = localStorage.getItem('authToken');
    try{
        const response  = await axios.post(`${import.meta.env.VITE_API_URL}/Order/PlaceOrder`,{userId, email, cartId, cartItemIds},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            alert(error.response.data.message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }
    
}

export default placeOrder