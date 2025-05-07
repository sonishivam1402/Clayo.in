import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import { ReviewCard } from './ReviewCard';
import AddOrUpdateCart from "../../utils/api/cart/AddOrUpdateCart";
import { toast } from 'react-toastify';
import SetRecentlyViewedItem from '../../utils/api/SetRecentlyViewedItem';

export const DetailedProduct = () => {

  const location = useLocation();
  const p = location.state || {};

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const imgRef = useRef(null);
  const [isZooming, setIsZooming] = useState(false);
  const [bgPos, setBgPos] = useState('0% 0%');
  const [lensPos, setLensPos] = useState({ top: 0, left: 0 });



  useEffect(() => {
    if (user != null && p != null) {
      console.log("call");
      setRecentlyVisitedItem();
    }
  }, [])

  const setRecentlyVisitedItem = async () => {
    const response = await SetRecentlyViewedItem(user.userId, p.productId);
    if (response) {
      console.log("set : ", response);
    }
  }

  const addToCart = async () => {
    if (user) {
      const response = await AddOrUpdateCart(user.userId, user.cartId, p.productId, quantity)
      if (response) {
        toast.success(response);
      }
    } else {
      toast.error("Please Login !!")
      navigate('/login')
    }

  };

  const handleZoom = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Clamp x and y inside image bounds
    const xClamped = Math.max(0, Math.min(x, width));
    const yClamped = Math.max(0, Math.min(y, height));

    // Center cursor in zoom background
    const xPercent = (xClamped / width) * 100;
    const yPercent = (yClamped / height) * 100;
    setBgPos(`${xPercent}% ${yPercent}%`);

    // Lens Size (you can adjust this)
    const lensSize = 150;

    // Correct lens position to center cursor
    let lensLeft = xClamped - lensSize / 2;
    let lensTop = yClamped - lensSize / 2;

    // Clamp lens to stay inside image
    lensLeft = Math.max(0, Math.min(lensLeft, width - lensSize));
    lensTop = Math.max(0, Math.min(lensTop, height - lensSize));

    setLensPos({ top: lensTop, left: lensLeft+200 });
  };





  return (
    <>
      <div className='w-screen h-300 sm:h-screen flex flex-col md:flex-row justify-center items-center  p-6'>
        <IoMdArrowBack size={24} className='hidden sm:block sm:hover:bg-amber-800 sm:rounded-2xl sm:hover:text-white sm:hover:cursor-pointer' onClick={() => { navigate(-1) }} />
        <div className="p-6 w-full md:w-1/2 flex justify-center items-center relative">

          <img
            src={p.image}
            alt="Product"
            className="w-90 h-110 hover:cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleZoom}
            ref={imgRef}  // Make sure you have this ref defined
          />

          {isZooming && (
            <div
              className="absolute border-2 border-amber-800 bg-transparent bg-opacity-20 pointer-events-none z-30 rounded-full"
              style={{
                width: '150px', 
                height: '150px',
                top: lensPos.top,
                left: lensPos.left,
              }}
            ></div>
          )}



          {/* 🔥 ZOOMED VIEW */}
          {isZooming && (
            <div
              className="hidden md:block absolute top-[0%] left-[100%] w-[700px] h-[500px] border-2 border-amber-800 rounded-xl bg-no-repeat bg-cover z-20"
              style={{
                backgroundImage: `url(${p.image})`,
                backgroundSize: '200%',
                backgroundPosition: bgPos,
              }}
            ></div>
          )}

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
            <input type="number" min="1" className="w-16 p-2 border border-gray-300 rounded" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>



          <button className="mt-4 px-6 py-3 border-2 border-amber-800 hover:text-white hover:bg-amber-800" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
      <div className='w-screen flex gap-2 overflow-x-scroll overflow-y-hidden hide-scrollbar '>
        <ReviewCard /><ReviewCard /><ReviewCard />
        <ReviewCard /><ReviewCard /><ReviewCard />
      </div>

    </>
  );
};