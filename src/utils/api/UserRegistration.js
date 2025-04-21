import React, { useEffect } from 'react'
import axios from 'axios';

const UserRegistration = async (name, email, phoneNumber, password) => {

    try{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/User/register`,{name,email,phoneNumber,password});
        console.log(response.data)
        return response.data;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            alert(error.response.data.message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }
}

export default UserRegistration