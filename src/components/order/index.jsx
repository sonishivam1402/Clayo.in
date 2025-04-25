import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import GetOrderDetails from '../../utils/api/order/GetOrderDetails';
import CancelOrder from '../../utils/api/order/CancelOrder';
import OrderCard from './OrderCard';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const loadOrderDetails = async () => {
    try {
      const response = await GetOrderDetails(user.id);
      console.log(response);
      if (response) setOrders(response);
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };

  const handleCancel = async (id) => {
    const response = await CancelOrder(id);
    if (response) {
      alert(response.Message);
      loadOrderDetails(); // reload orders after cancellation
    }
  };

  useEffect(() => {
    loadOrderDetails();
  }, []);

  return (
    <div className='p-6 w-screen bg-gray-100 text-left'>
      <IoMdArrowBack size={24} className='hidden sm:block absolute hover:bg-amber-800 rounded-2xl hover:text-white cursor-pointer' onClick={() => navigate(-1)} />
      <div className="flex justify-center items-center">
        <span className='text-2xl font-medium text-amber-700'>-: My Orders :-</span>
      </div>
      <hr className='mt-2' />

      {orders.length > 0 ? (
        orders.map((item, index) => (
          <OrderCard key={item.orderId || index} order={item} onCancel={handleCancel} />
        ))
      ) : (
        <p className='h-screen m-1 text-2xl font-medium text-amber-700 text-center'>No Order Placed Yet</p>
      )}
    </div>
  );
};

export default Orders;
