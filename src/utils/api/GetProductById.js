import React from 'react'
import axiosInstance from './axiosInstance';

const GetProductById = async (productId) => {
    try {
        const products = await axiosInstance.get(`/product/${productId}`);
        return products.data;
    } catch(error) {
        if(error.response.data){
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
}

export default GetProductById