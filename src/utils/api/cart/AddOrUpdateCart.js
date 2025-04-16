import React from 'react'
import axios from 'axios'

const AddOrUpdateCart = async (userId,cartId,productId,quantity) => {
    try{
        const response  = await axios.post("/api/Cart/addOrUpdate",{userId, cartId, productId, quantity});
        console.log(response.data);
        return response.data;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            alert(error.response.data.message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }
    
}

export default AddOrUpdateCart