import React from 'react';
import OrderTracking from './OrderTracking';
import dayjs from 'dayjs';

const OrderItem = ({ item, order, orderItemKey, onCancel }) => {
    const shippingInfo = order.shippingOrders[orderItemKey];

    return (
        <div className='mt-3 p-3 bg-white rounded-2xl sm:flex justify-start items-start gap-5'>
            <div className='p-6 w-full sm:w-70 flex justify-center items-center'>
                <img src={item.image} alt={item.title} className='h-20 sm:h-auto' />
            </div>

            <div className='w-full flex flex-col'>
                <div className="w-full sm:flex justify-start items-center gap-10">
                    <span className='font-medium'>{item.title}</span>
                    {order.status === 'Cancel' ? (
                        <span className="hidden sm:block mt-1 w-fit px-2 py-1 bg-red-500 text-white text-xs rounded-md">
                            Cancelled
                        </span>
                    ) : (
                        <span className="hidden sm:block mt-1 w-fit px-2 py-1 bg-green-500 text-white text-xs rounded-md">
                            {order.status}
                        </span>
                    )}
                </div>

                <span>Price: ${item.price}</span>
                <span>Qty: {item.quantity}</span>

                {order.status !== 'Cancel' && (
                    <>
                        <span>Est. Delivery: {dayjs(shippingInfo.estimatedDeliveryDate).format('DD MMM YYYY hh:mm A')}</span>
                        <span>Tracking Number: {shippingInfo.trackingNumber}</span>
                        <span className='sm:hidden'>Status: <span className='text-green-700'>{shippingInfo.status}</span></span>
                    </>
                )}

                <div className="py-3 flex justify-between sm:justify-start gap-5">
                    <button className='bg-blue-500! text-white! px-4! py-2! rounded! hover:bg-blue-600!'>View Order</button>
                    {order.status !== 'Delivered' && order.status !== 'Cancel' && (
                        <button className='bg-red-500! text-white! px-4! py-2! rounded! hover:bg-red-600!' onClick={() => onCancel(order.orderId)}>Cancel Order</button>
                    )}
                </div>
            </div>

            <div className='sm:p-6 w-full'>
                {order.status === 'Cancel' ? (
                    <div className="bg-red-100 text-red-700 p-3 rounded mt-2">
                        This order has been cancelled. No tracking information available.
                    </div>
                ) : (
                    <OrderTracking
                        status={shippingInfo.status}
                        placedAt={order.placedAt}
                        estimated={shippingInfo.estimatedDeliveryDate}
                    />
                )}
            </div>

        </div>
    );
};

export default OrderItem;
