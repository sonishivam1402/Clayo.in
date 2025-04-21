import React from 'react'
import axios from 'axios'

const GetCartItem = async (userId,cartId) => {
    const token = localStorage.getItem('authToken');
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/${userId}/${cartId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response.data;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            alert(error.response.data[0].message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }
    
}

export default GetCartItem


