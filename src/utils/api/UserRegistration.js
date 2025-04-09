import React, { useEffect } from 'react'
import axios from 'axios';

const UserRegistration = async (name, email, phoneNumber, password) => {

    try{
        const response = await axios.post('/api/User/register',{name,email,phoneNumber,password});
        console.log(response.data)
        return response.data;
    }catch(error){
        if(error.response){
            alert("login Failed");
        }else{
            alert("Network Error");
        }
    }
}

export default UserRegistration