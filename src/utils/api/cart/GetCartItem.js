import React from 'react'
import axios from 'axios'

const GetCartItem = async (userId) => {
    try{
        const response = await axios.get(`/api/cart/${userId}`);
        console.log(response);
        return response.data;
    }catch(err){
        console.log(err);
        alert(err.response.data[0].message);
    }
    
}

export default GetCartItem



///  need to manage response as there are two objects returning based on condition