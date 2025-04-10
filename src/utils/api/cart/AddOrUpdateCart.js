import React from 'react'
import axios from 'axios'

const AddOrUpdateCart = async (userId,productId,quantity) => {
    try{
        const response  = await axios.post("/api/Cart/addOrUpdate",{userId, productId, quantity});
        console.log(response);
        return response;
    }catch(err){
        if(err.response){
            alert(err.response);
        }else{
            alert("Network Error");
        }
    }
    
}

export default AddOrUpdateCart