import React from 'react'
import axios from 'axios'

const Product = async () => {

    try {
        const products = await axios.get("/api/product")
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