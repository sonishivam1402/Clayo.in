import React, { useEffect } from 'react'
import axios from 'axios';

const LoginAuth = async (email, password) => {

    try{
        const response = await axios.post('/api/User/Login',{email,password});
        console.log("Login Successfull",response)
        return response.data.user;
    }catch(error){
        if(error.response.data){
            //console.log(error.response)
            alert(error.response.data.message)
        }else{
            alert(error.response.statusText + ", " + error.message);
        }
    }
}

export default LoginAuth