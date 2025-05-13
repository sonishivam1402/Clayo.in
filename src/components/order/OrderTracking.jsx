import React from 'react';
import { BsBox } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const OrderTracking = ({ shipping, order }) => {
  // Calculate progress percentage based on status
  const getProgressPercentage = () => {
    switch (shipping.status) {
      case 'Placed': return 25;
      case 'Dispatch': return 50;
      case 'Out for Delivery': return 75;
      case 'Delivered': return 100;
      default: return 0;
    }
  };

  const isActive = (step) => {
    const statusOrder = ['Placed', 'Dispatch', 'Out for Delivery', 'Delivered'];
    const currentIndex = statusOrder.indexOf(shipping.status);
    const stepIndex = step === 'Placed' ? 0 : step === 'Dispatch' ? 1 : step === 'OutForDelivery' ? 2 : 3;
    
    return stepIndex <= currentIndex;
  };

  return (
    <div className='rounded-lg border border-gray-100 overflow-hidden'>
      {/* Shipping Details */}
      <div className='bg-gray-50 p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <InfoBlock 
              title="Total Amount" 
              value={`$${order.totalAmount.toFixed(2)}`} 
              titleClass="text-xs text-gray-500"
              valueClass="text-base font-medium text-gray-900"
            />
          </div>
          
          <div>
            <InfoBlock 
              title="Est. Delivery" 
              value={dayjs(shipping.estimatedDeliveryDate).format('ddd, MMM D, YYYY')} 
              titleClass="text-xs text-gray-500"
              valueClass="text-base font-medium text-gray-900"
            />
          </div>
          
          <div>
            <InfoBlock 
              title="Tracking Number" 
              value={`#${shipping.trackingNumber}`} 
              titleClass="text-xs text-gray-500"
              valueClass="text-base font-medium text-gray-900"
            />
          </div>
          
          <div>
            <InfoBlock 
              title="Delivery Address" 
              value="Iscon Atria 1, Gotri, Vadodara" 
              titleClass="text-xs text-gray-500"
              valueClass="text-base font-medium text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Tracking Progress */}
      <div className='p-5'>
        <div className='mb-6'>
          <div className='relative'>
            {/* Progress Bar */}
            <div className='overflow-hidden h-1 mb-6 text-xs flex rounded bg-amber-100'>
              <div 
                className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-700'
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            
            {/* Progress Steps */}
            <div className='flex justify-between'>
              <TrackingStep 
                icon={<BsBox />} 
                label="Ordered" 
                date={dayjs(order.placedAt).format('MMM D')}
                active={isActive('Placed')}
              />
              
              <TrackingStep 
                icon={<MdLocalShipping />} 
                label="Dispatched" 
                date={isActive('Dispatch') ? dayjs(order.placedAt).add(1, 'day').format('MMM D') : ''}
                active={isActive('Dispatch')}
              />
              
              <TrackingStep 
                icon={<MdLocalShipping />} 
                label="Out for Delivery" 
                date={isActive('Out for Delivery') ? dayjs(shipping.estimatedDeliveryDate).subtract(1, 'day').format('MMM D') : ''}
                active={isActive('OutForDelivery')}
              />
              
              <TrackingStep 
                icon={<IoLocationOutline />} 
                label="Delivered" 
                date={shipping.status === 'Delivered' ? dayjs(shipping.estimatedDeliveryDate).format('MMM D') : ''}
                active={shipping.status === 'Delivered'}
              />
            </div>
          </div>
        </div>
        
        {/* Timeline Information */}
        <div className='flex justify-between text-xs text-gray-500 mt-3'>
          <span>Order Placed: {dayjs(order.placedAt).fromNow()}</span>
          <span>Expected Delivery: {dayjs().to(shipping.estimatedDeliveryDate)}</span>
        </div>
      </div>
    </div>
  );
};

const TrackingStep = ({ icon, label, date, active }) => (
  <div className='flex flex-col items-center'>
    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${active ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-400'}`}>
      {icon}
    </div>
    <div className='text-center mt-2'>
      <p className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-500'}`}>{label}</p>
      {date && <p className='text-xs text-gray-500'>{date}</p>}
    </div>
  </div>
);

const InfoBlock = ({ title, value, titleClass, valueClass }) => (
  <div className="mb-2">
    <div className={titleClass}>{title}</div>
    <div className={valueClass}>{value}</div>
  </div>
);

export default OrderTracking;