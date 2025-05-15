import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import axiosInstance from '../axiosInstance';

const GetAllOrderDetails = async () => {
  try {
    const response = await axiosInstance.get(`/Admin/GetOrderDetails`);
    if (response) {
      //console.log(response)
      return response.data;
    }
  }
  catch (error) {
    if (err.response.status == 401) {
      return err.response.status;
    }
    if (error.response.data) {
      //console.log(error.response)
      toast.error(error.response.data[0].message)
    } else {
      toast.error(error.response.statusText + ", " + error.message);
    }
  }
}

export default GetAllOrderDetails