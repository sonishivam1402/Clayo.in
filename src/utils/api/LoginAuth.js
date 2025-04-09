import React, { useEffect } from 'react'
import axios from 'axios';

const LoginAuth = async (email, password) => {

    try{
        const response = await axios.post('/api/User/Login',{email,password});
        console.log("Login Successfull",response.data)
        return response.data;
    }catch(error){
        if(error.response){
            alert("login Failed");
        }else{
            alert("Network Error");
        }
    }
}

export default LoginAuth