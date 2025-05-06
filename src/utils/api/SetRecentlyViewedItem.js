import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';

const SetRecentlyViewedItem = async (userId, productId) => {
    //console.log("Posting Recently Viewed:", userId, productId);
    try {
        const response = await axiosInstance.post('/RecentlyViewed/set', {
            userId,
            productId
        });

        //console.log("Response:", response.data);
        return response.data;  

    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
            console.log(err.response.data.message);
        } else {
            toast.error("Failed to set recently viewed item.");
        }
        return null;
    }
};

export default SetRecentlyViewedItem;
