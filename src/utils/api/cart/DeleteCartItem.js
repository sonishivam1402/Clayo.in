import React from 'react'
import axios from 'axios'

const DeleteCartItem = async (cartId) => {
    const token = localStorage.getItem('authToken');
try{
    const response = await axios.delete(`/api/cart/delete/${cartId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log(response)
    return response.data;
}
catch(error){
    if(error.response.data){
        //console.log(error.response)
        alert(error.response.data.message)
    }else{
        alert(error.response.statusText + ", " + error.message);
    }
}  
}

export default DeleteCartItem