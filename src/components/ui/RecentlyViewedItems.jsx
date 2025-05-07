import React, { useState, useEffect } from 'react';
import GetRecentlyViewedItems from '../../utils/api/GetRecentlyViewedItems';
import { FiClock } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GetProductById from '../../utils/api/GetProductById';
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";

const RecentlyViewedItems = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItems = async () => {
      try {
        // Get user from localStorage
        const userStr = localStorage.getItem("user");
        if (!userStr) return;

        const user = JSON.parse(userStr);
        const result = await GetRecentlyViewedItems(user.userId);

        if (result) {
          //console.log("Recently viewed items:", result);
          setRecentItems(result);
        }
      } catch (error) {
        console.error("Error loading recently viewed items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);


  const handleCardClick = async (productId) => {
    const response = await GetProductById(productId);
    if (response) {
      const p = response;
      navigate('/detailedProduct', { state: p });
    }

  };


  if (isLoading) {
    return (
      <div className="w-full mt-3">
        <h2 className="text-xl font-bold mb-4 text-amber-800">Recently Viewed</h2>
        <div className="flex space-x-4 pb-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex-shrink-0 w-48 h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!recentItems || Object.keys(recentItems).length === 0) {
    return null;
  }

  return (
    <div className="w-screen mt-6">
      <div className='px-6 w-full flex justify-between items-center'>
        <HiArrowSmLeft size={28} className='text-amber-800 hover:text-white hover:bg-amber-700 hover:rounded-full hover:cursor-pointer' onClick={() => document.getElementById('product-containers').scrollBy({ left: -250, behavior: "smooth" })}/>
        <h2 className="text-xl font-bold mb-4 text-amber-800">Recently Viewed</h2>
        <HiArrowSmRight size={28} className='text-amber-800 hover:text-white hover:bg-amber-700 hover:rounded-full hover:cursor-pointer' onClick={() => document.getElementById('product-containers').scrollBy({ left: 250, behavior: "smooth" })}/>
      </div>


      {/* Scrollable container for cards */}
      <div id='product-containers' className="flex items-center justify-start gap-7 overflow-x-scroll  hide-scrollbar space-x-4 p-4">
        {Object.entries(recentItems).map(([key, item]) => (
          <div
            key={key}
            className="flex-shrink-0 w-48 border border-amber-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer bg-white"
            onClick={() => handleCardClick(item.productId)}
          >
            <div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.productName}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3">
              <h3 className="font-medium text-sm mb-1 truncate text-gray-800" title={item.productName}>
                {item.productName}
              </h3>

              <p className="text-lg font-bold text-amber-800">
                ${item.price}
              </p>

              <div className="flex justify-center items-center mt-2 text-xs text-amber-600 border-t border-amber-100 pt-2">
                <FiClock size={12} className="mr-1" />
                <span className="text-gray-600">{new Date(item.viewedAt).toLocaleDateString()} • {new Date(item.viewedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedItems;