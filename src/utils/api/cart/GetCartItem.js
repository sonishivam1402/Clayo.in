import React from 'react'
import axios from 'axios'

const GetCartItem = async (userId) => {
    try{
        const response = await axios.get(`/api/cart/${userId}`);
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


