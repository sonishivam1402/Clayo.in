import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { ReviewCard } from './ReviewCard';
import AddOrUpdateCart from "../../utils/api/cart/AddOrUpdateCart";
import { toast } from 'react-toastify';

export const DetailedProduct = () => {

  const location = useLocation();
  const p = location.state || {};
  
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    if(user){
      const response = await AddOrUpdateCart(user.id, user.cartId, p.productId, quantity)
      if (response){
          toast.success(response);
      }
    }else{
      toast.error("Please Login !!")
      navigate('/login')
    }
    
};

  return (
    <>
      <div className='w-screen h-300 sm:h-screen flex flex-col md:flex-row justify-center items-center  p-6'>
        <IoMdArrowBack size={24} className='hidden sm:block sm:hover:bg-amber-800 sm:rounded-2xl sm:hover:text-white sm:hover:cursor-pointer' onClick={() => { navigate(-1) }} />
        <div className="p-6 w-full md:w-1/2 flex justify-center items-center ">
          <img src={p.image} alt="Product" className='w-90 h-110' />
        </div>

        <div className="w-full h-fit md:w-1/2 p-6 flex flex-col space-y-4 text-amber-800 rounded-lg text-left gap-1">

          <h2 className="text-2xl font-bold ">{p.title}</h2>


          <p className="text-gray-600">{p.description}</p>
          <span className="text-sm text-gray-500">Category: {p.category}</span>
          <span className="text-sm text-gray-500">Stock Available: {p.stock}</span>
          <span className="text-lg">⭐ {p.rating_rate}</span>

          <p className="text-2xl font-semibold text-green-600">${p.price}</p>

          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <input type="number" min="1" className="w-16 p-2 border border-gray-300 rounded" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
          </div>



          <button className="mt-4! px-6! py-3! border-2! border-amber-800! hover:bg-amber-800!" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
      <div className='w-screen flex gap-2 overflow-x-scroll overflow-y-hidden hide-scrollbar '>
        <ReviewCard /><ReviewCard /><ReviewCard />
        <ReviewCard /><ReviewCard /><ReviewCard />
      </div>

    </>
  );
};