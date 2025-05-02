import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';


const Product = async () => {
    try {
        const products = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
        //console.log("Product Fetched Succesfully", products.data)
        return products.data;
    } catch(error) {
        if(error.response.data){
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
}

export default Product