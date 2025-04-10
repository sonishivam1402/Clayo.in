import React from 'react'
import axios from 'axios'

const GetCartItem = async (userId) => {
    try{
        const response = await axios.get("/api/cart/userId",{userId});
        console.log(response);
        return response;
    }catch(err){
        if(err.response){
            alert(err.response);
        }
        alert(err.response);
    }
    
}

export default GetCartItem