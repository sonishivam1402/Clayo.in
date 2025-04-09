import React from 'react'
import axios from 'axios'

const Product = async () => {

    try {
        const products = await axios.get("/api/product")
        console.log("Product Fetched Succesfully", products.data)
        return products.data;
    } catch(error) {
        if(error.response){
            alert(error.reponse)
        }
    }
}

export default Product