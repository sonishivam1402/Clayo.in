import React from 'react'
import axios from 'axios'


const Product = async () => {
    //const token = localStorage.getItem('authToken');
    try {
        //console.log(`${import.meta.env.VITE_API_URL}`);

        const products = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
        console.log("Product Fetched Succesfully", products.data)
        return products.data;
    } catch(error) {
        if(error.response.data){
            //console.log(error.response)
            alert(error.response.data.message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }
}

export default Product