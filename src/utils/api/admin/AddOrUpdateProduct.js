import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

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
            toast.error(err.response.data.title);
        }else{
            toast.error(err.message);
        }
    }
}

export default AddOrUpdateProduct