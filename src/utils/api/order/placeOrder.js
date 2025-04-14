import React from 'react'
import axios from 'axios'

const placeOrder = async (cartIds) => {
    try{
        const response  = await axios.post('/api/Order/PlaceOrder',{cartIds});
        return response;
    }catch(err){
        alert(err.response);
    }
    
}

export default placeOrder