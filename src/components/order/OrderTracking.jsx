import React from 'react';
import { BiSolidPackage } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const OrderTracking = ({shipping, order}) => {
  const progressWidth = {
    Placed: 'w-1/4',
    Dispatch: 'w-2/4',
    'Out for Delivery': 'w-3/4',
    Delivered: 'w-full'
  };

  return (
    <div className='w-full sm:flex'>
      <div className="w-full bg-white rounded-2xl">
        <InfoBlock title="Total Amount : " value={`$${order.totalAmount}`} />
        <InfoBlock title="Est. Delivery : " value={dayjs(shipping.estimatedDeliveryDate).format('DD MMM YYYY, hh:mm A')} />
        <InfoBlock title="Tracking Number : " value={`#${shipping.trackingNumber}`} />
        <InfoBlock title="Delivered To : " value="Iscon Atria 1, Gotri, Vadodara" />
      </div>

      <div className="w-full bg-gray-100 text-center">

        <div className='flex justify-between items-center p-3'>
          <BiSolidPackage size={30} color={['Placed', 'Out for Delivery', 'Delivered'].includes(shipping.status) ? 'green' : 'black'} />
          <MdLocalShipping size={30} color={['Out for Delivery', 'Delivered'].includes(shipping.status) ? 'green' : 'black'} />
          <IoLocationSharp size={30} color={shipping.status === 'Delivered' ? 'green' : 'black'} />
        </div>

        <div className='bg-white h-1'>
          <div className={`bg-green-600 h-1 ${progressWidth[shipping.status] || 'w-0'}`} />
        </div>

        <div className='flex justify-between text-xs mt-2'>
          <span>Order Received <br />{dayjs(order.placedAt).fromNow()}</span>
          <span>Est. Delivery <br />{dayjs().to(shipping.estimatedDeliveryDate)}</span>
        </div>
      </div>
    </div>

  );
};

const InfoBlock = ({ title, value }) => (
  <div className="w-full">
    {title}
    <span className='font-medium'> {value}</span>
  </div>
);

export default OrderTracking;
