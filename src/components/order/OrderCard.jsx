import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import OrderItem from './OrderItem';

const OrderCard = ({ order, onCancel }) => {
  const orderDate = useMemo(() => dayjs(order.placedAt).format('MMMM D, YYYY'), [order.placedAt]);
  const orderItems = order.orderItems || {};
  
  return (
    <div className=' bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100'>
      <div className='bg-gray-50 px-6 py-4'>
        <div className='flex flex-wrap justify-between items-center'>
          <div>
            <span className='text-xs text-gray-500'>ORDER</span>
            <h3 className='font-medium text-gray-900'>#{order.orderNumber}</h3>
          </div>
          <div className='text-right'>
            <span className='text-xs text-gray-500'>PLACED ON</span>
            <p className='text-sm text-gray-900'>{orderDate}</p>
          </div>
        </div>
      </div>
      
      <div className='divide-y divide-gray-100'>
        {Object.entries(orderItems).map(([key, item]) => (
          <OrderItem 
            key={key} 
            item={item} 
            order={order} 
            orderItemKey={key} 
            onCancel={onCancel} 
          />
        ))}
      </div>
    </div>
  );
};

export default OrderCard;