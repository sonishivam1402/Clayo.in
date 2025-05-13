import React from 'react';
import OrderTracking from './OrderTracking';
import dayjs from 'dayjs';

const OrderItem = ({ item, order, orderItemKey, onCancel }) => {
  const showCancelButton = item.status !== 'Delivered' && item.status !== 'Cancel';
  
  // Status badge style based on current status
  const getStatusBadgeStyle = () => {
    switch(item.status) {
      case 'Cancel':
        return 'bg-red-50 text-red-800 border border-red-100';
      case 'Delivered':
        return 'bg-green-50 text-green-800 border border-green-100';
      case 'Out for Delivery':
        return 'bg-blue-50 text-blue-800 border border-blue-100';
      default:
        return 'bg-amber-50 text-amber-800 border border-amber-100';
    }
  };

  return (
    <div className='p-6'>
      <div className='sm:flex'>
        {/* Product Image */}
        <div className='sm:w-32 flex-shrink-0'>
          <div className='aspect-square overflow-hidden bg-gray-50 rounded border border-gray-100'>
            <img 
              src={item.image} 
              alt={item.title} 
              className='h-full w-full object-contain object-center p-2' 
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className='mt-4 sm:mt-0 sm:ml-6 flex-1'>
          <div className='flex items-start justify-between'>
            <div>
              <h4 className='text-base font-medium text-gray-900 leading-tight'>{item.title}</h4>
              <div className='mt-1 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500'>
                <InfoBlock title="Quantity" value={item.quantity} />
                <InfoBlock title="Price" value={`${item.price}`} />
                <InfoBlock title="Placed" value={dayjs(order.placedAt).format('MMM D, h:mm A')} />
              </div>
            </div>
            
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle()} whitespace-nowrap`}>
              {item.status}
            </span>
          </div>
          
          {/* Tracking Information */}
          <div className='mt-6'>
            {item.status === 'Cancel' ? (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Order Cancelled</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>This order has been cancelled. No tracking information is available.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : item.status === 'Delivered' ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Order Delivered Successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Your order was delivered on {item.shippingOrders && item.shippingOrders[0] ? 
                          dayjs(item.shippingOrders[0].estimatedDeliveryDate).format('MMMM D, YYYY') : 
                          'the estimated delivery date'}.
                      </p>
                      {item.shippingOrders && item.shippingOrders[0] && (
                        <p className="mt-1">
                          <span className="font-medium">Tracking number:</span> #{item.shippingOrders[0].trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : item.shippingOrders ? (
              <OrderTracking
                shipping={item.shippingOrders[0]}
                order={order}
              />
            ) : (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Processing Order</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Your order is being processed. Shipping information will be available soon.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showCancelButton && (
            <div className="mt-6 flex justify-end">
              <button
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors'
                onClick={() => onCancel(item.orderItemId)}
              >
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({ title, value }) => (
  <div>
    <span className='text-gray-500'>{title}: </span>
    <span className='font-medium text-gray-700'>{value}</span>
  </div>
);

export default OrderItem;

