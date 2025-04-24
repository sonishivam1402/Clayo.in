import React from 'react';
import dayjs from 'dayjs';
import OrderItem from './OrderItem';

const OrderCard = ({ order, onCancel }) => {
  return (
    <div className='p-3 mt-3 bg-gray-200 rounded-2xl'>
      <div className="p-3 bg-white rounded-2xl sm:flex justify-start items-center gap-3">
        <InfoBlock title="Total Amount" value={`$${order.totalAmount}`} />
        <InfoBlock title="Placed At" value={dayjs(order.placedAt).format('DD MMM YYYY, hh:mm A')} />
        <InfoBlock title="Status" value={order.status} />
        <InfoBlock title="Delivered To" value="Iscon Atria 1, Gotri, Vadodara" />
      </div>

      {Object.entries(order.orderItems).map(([key, item]) => (
        <OrderItem key={key} item={item} order={order} orderItemKey={key} onCancel={onCancel} />
      ))}
    </div>
  );
};

const InfoBlock = ({ title, value }) => (
  <div className="p-3 bg-gray-100 text-center w-full">
    {title}<br />
    <span className='font-medium'>{value}</span>
  </div>
);

export default OrderCard;
