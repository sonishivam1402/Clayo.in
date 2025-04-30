import React from 'react'
import axios from 'axios';

const AddOrUpdateProduct = async (product) => {
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/Product`, product, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        //console.log(response.data)
        return response.data;
    }
    catch (err) {
        //console.log(err);
        if(err.response.data){
            alert(err.response.data.title);
        }else{
            alert(err.message);
        }
    }
}

export default AddOrUpdateProduct