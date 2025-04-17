import React from 'react'
import axios from 'axios';

const UserById = async (id) => {

    try {
        const response = await axios.post(`/api/User/Id/${id}`)
        //console.log(response)
        if(response){
            return response.data;
        }
    
    } catch (err) {
        if(err.response){
            alert(err.response);
        }
    }
   
}

export default UserById