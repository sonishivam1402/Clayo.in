import React from 'react'
import axios from 'axios'

const DeleteCartItem = async (cartId) => {
try{
    const response = await axios.delete(`/api/cart/delete/${cartId}`)
    //console.log(response)
    return response.data;
}
catch(err){
    if(err.response){
        alert(err.response);
    }
    alert("Network Error");
}  
}

export default DeleteCartItem