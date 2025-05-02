import React, { useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const AddOrUpdateUser = async (data) => {
console.log(data);
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/User/AddOrUpdateUser`,data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        //console.log(response.data)
        return response.data;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            toast.error(error.response.data.message)
        }else{
            toast.error(error.response.statusText + ", " + error.message);
        }
    }
}

export default AddOrUpdateUser