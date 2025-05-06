import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from './axiosInstance';

const GetRecentlyViewedItems = async (userId) => {
    try {
        const response = await axiosInstance.get(`/RecentlyViewed/get/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(`${error.response?.statusText || "Error"}: ${error.message}`);
        }
        return []; // return empty list in case of failure
    }
}

export default GetRecentlyViewedItems