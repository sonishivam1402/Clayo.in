import React from 'react';
import OrderTracking from './OrderTracking';
import dayjs from 'dayjs';

const OrderItem = ({ item, order, orderItemKey, onCancel }) => {
    // const shippingInfo = order.shippingOrders?.[orderItemKey];
    // console.log("shippingInfo ", shippingInfo)
    const showCancelButton = item.status !== 'Delivered' && item.status !== 'Cancel';

    return (
        <div className='mt-3 p-3 bg-white rounded-2xl sm:flex justify-start items-start gap-5'>
            <div className='p-3 w-full sm:w-70 flex justify-center items-center'>
                <img src={item.image} alt={item.title} className='h-20 sm:h-auto' />
            </div>

            <div className='sm:w-1/2 flex flex-col'>
                <div className="w-full sm:flex justify-start items-center gap-10">
                    <span className='font-medium'>#{order.orderNumber}</span>
                    <span className={`hidden sm:block mt-1 w-fit px-2 py-1 text-white text-xs rounded-md ${item.status === 'Cancel' ? 'bg-red-500' : 'bg-green-500'}`}>
                        {item.status}
                    </span>
                </div>
                <InfoBlock value={`${item.title}`} />
                <InfoBlock title="Price : " value={`$${item.price}`} />
                <InfoBlock title="Qty : " value={`${item.quantity}`} />
                <InfoBlock title="Placed At : " value={`${dayjs(order.placedAt).format('DD MMM YYYY hh:mm A')}`} />

                <div className="py-3 flex justify-between sm:justify-start gap-5">
                    {/* <button className='bg-blue-500! text-white! px-3! py-1! rounded! hover:bg-blue-600!'>
                        View Order
                    </button> */}
                    {showCancelButton && (
                        <button
                            className='bg-red-500! text-white! px-4! py-2! rounded! hover:bg-red-600!'
                            onClick={() => onCancel(item.orderItemId)}
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>

            <div className='w-full gap-5'>
                {item.status === 'Cancel' ? (
                    <div className="bg-red-100 text-red-700 p-3 rounded mt-2">
                        This order has been cancelled. No tracking information available.
                    </div>
                ) : item.shippingOrders ? (
                    <OrderTracking
                        shipping={item.shippingOrders[0]}
                        order={order}
                    />
                ) : (
                    <div className="bg-yellow-100 text-yellow-800 p-3 rounded mt-2">
                        Shipping information not yet available.
                    </div>
                )}
            </div>

        </div>
    );
};

const InfoBlock = ({ title, value }) => (
    <div>
        {title}<span className='font-medium'>{value}</span>
    </div>
);

export default OrderItem;
