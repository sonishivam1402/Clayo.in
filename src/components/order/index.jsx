import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
import GetOrderDetails from '../../utils/api/order/GetOrderDetails';
import CancelOrder from '../../utils/api/order/CancelOrder';
import OrderCard from './OrderCard';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const loadOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await GetOrderDetails(user.userId);
      if (response) setOrders(response);
    } catch (err) {
      toast.error("Failed to load orders");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await CancelOrder(id);
      if (response) {
        toast.success(response.message);
        loadOrderDetails();
      }
    } catch (error) {
      toast.error("Failed to cancel order");
      console.error("Error canceling order:", error);
    }
  };

  useEffect(() => {
    loadOrderDetails();
  }, []);

  // Extract all unique statuses from orders
  const availableStatuses = useMemo(() => {
    if (!orders.length) return ['All'];
    
    const statuses = new Set(['All']);
    orders.forEach(order => {
      Object.values(order.orderItems || {}).forEach(item => {
        if (item.status) statuses.add(item.status);
      });
    });
    return Array.from(statuses);
  }, [orders]);

  // Filter orders based on selected status
  const filteredOrders = useMemo(() => {
    if (filterStatus === 'All') return orders;
    
    return orders.filter(order => {
      // Check if any item in the order matches the selected status
      return Object.values(order.orderItems || {}).some(item => item.status === filterStatus);
    });
  }, [orders, filterStatus]);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header with back button */}
      <div className='sticky top-0 z-10 bg-white shadow-sm'>
        <div className='w-screen mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <button 
              onClick={() => navigate(-1)}
              className='flex items-center text-amber-800 hover:text-amber-900 transition-colors'
            >
              <IoChevronBackOutline size={20} />
              <span className='ml-1 text-sm font-medium'>Back</span>
            </button>
            <h1 className='text-xl font-serif font-medium text-amber-900'>My Orders</h1>
            <div className='relative'>
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className='flex items-center text-amber-800 hover:text-amber-900 transition-colors'
              >
                <IoFilterOutline size={20} />
                <span className='ml-1 text-sm font-medium'>Filter</span>
              </button>
              
              {/* Filter dropdown menu */}
              {showFilterMenu && (
                <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20'>
                  <div className='py-1'>
                    {availableStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status);
                          setShowFilterMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${filterStatus === status ? 'bg-amber-50 text-amber-800' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter status indicator */}
      {filterStatus !== 'All' && (
        <div className='bg-amber-50 px-4 py-2 text-amber-800 text-sm font-medium'>
          <div className='px-6 w-screen mx-auto flex items-center justify-between'>
            <span>Showing orders: {filterStatus}</span>
            <button 
              onClick={() => setFilterStatus('All')}
              className='text-amber-700 hover:text-amber-900'
            >
              Clear filter
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {loading ? (
          <div className='flex justify-center items-center py-16'>
            <div className='animate-pulse flex flex-col items-center'>
              <div className='h-4 w-32 bg-gray-200 rounded mb-4'></div>
              <div className='h-32 w-full max-w-2xl bg-gray-200 rounded'></div>
            </div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className='space-y-6'>
            {filteredOrders.map((item, index) => (
              <OrderCard key={item.orderId || index} order={item} onCancel={handleCancel} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-16'>
            <div className='text-amber-700 text-center'>
              <svg 
                className='mx-auto h-12 w-12 mb-4 text-amber-700 opacity-75' 
                fill='none' 
                viewBox='0 0 24 24' 
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
              </svg>
              <h3 className='text-lg font-serif font-medium'>
                {filterStatus !== 'All' ? `No ${filterStatus} Orders Found` : 'No Orders Yet'}
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                {filterStatus !== 'All' 
                  ? 'Try selecting a different filter or view all orders'
                  : 'Start exploring our collections to make your first purchase.'}
              </p>
              <button 
                onClick={() => filterStatus !== 'All' ? setFilterStatus('All') : navigate('/shop')}
                className='mt-6 px-6 py-2 bg-amber-700 text-white font-medium text-sm rounded hover:bg-amber-800 transition-colors'
              >
                {filterStatus !== 'All' ? 'View All Orders' : 'Discover Collections'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;