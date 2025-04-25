import React from 'react';
import dayjs from 'dayjs';
import OrderItem from './OrderItem';

const OrderCard = ({ order, onCancel }) => {
  return (
    <div className='p-3 mt-3 bg-gray-200 rounded-2xl'>
      {Object.entries(order.orderItems).map(([key, item]) => (
        <OrderItem key={key} item={item} order={order} orderItemKey={key} onCancel={onCancel} />
      ))}
    </div>
  );
};

export default OrderCard;
