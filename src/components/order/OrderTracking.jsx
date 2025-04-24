import React from 'react';
import { BiSolidPackage } from "react-icons/bi";
import { MdLocalShipping } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const OrderTracking = ({ status, placedAt, estimated }) => {
  const progressWidth = {
    Placed: 'w-1/4',
    Dispatch: 'w-2/4',
    'Out for Delivery': 'w-3/4',
    Delivered: 'w-full'
  };

  return (
    <div className="p-3 w-full bg-gray-100 text-center">
      <div className='flex justify-between items-center p-3'>
        <BiSolidPackage size={30} color={['Placed', 'Out for Delivery', 'Delivered'].includes(status) ? 'green' : 'black'} />
        <MdLocalShipping size={30} color={['Out for Delivery', 'Delivered'].includes(status) ? 'green' : 'black'} />
        <IoLocationSharp size={30} color={status === 'Delivered' ? 'green' : 'black'} />
      </div>

      <div className='bg-white h-1'>
        <div className={`bg-green-600 h-1 ${progressWidth[status] || 'w-0'}`} />
      </div>

      <div className='flex justify-between text-xs mt-2'>
        <span>Order Received <br />{dayjs(placedAt).fromNow()}</span>
        <span>Est. Delivery <br />{dayjs().to(estimated)}</span>
      </div>
    </div>
  );
};

export default OrderTracking;
