import React from 'react'
import axios from 'axios'

const placeOrder = async (userId, cartId, cartItemIds) => {
    try{
        const response  = await axios.post('/api/Order/PlaceOrder',{userId, cartId, cartItemIds});
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