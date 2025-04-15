import React, { useEffect, useState } from 'react'
import GetOrderDetails from '../utils/api/order/GetOrderDetails';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BiSolidPackage } from "react-icons/bi";
import { FcShipped } from "react-icons/fc";
import { MdLocalShipping } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

dayjs.extend(relativeTime);

const Orders = () => {

    const [order, setOrder] = useState({});
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem("user"));

    const loadOrderDetails = async () => {
        const response = await GetOrderDetails(user.id);
        if(response){
            console.log(response);
            setOrder(response);
        }
    }

    useEffect(() => {
        loadOrderDetails();
    }, []);

    useEffect(() => {
        if (order.length > 0) {
            const total_prices = order.reduce((acc, item) => {
                return acc + parseFloat(item.product_total_price);
            }, 0);

            setTotal(total_prices);
        }
    }, [order]);

    return (
        <div className='p-6 w-screen h-screen bg-gray-100 text-left'>
            <IoMdArrowBack size={24} className='hidden sm:block absolute sm:hover:bg-amber-800 sm:rounded-2xl sm:hover:text-white sm:hover:cursor-pointer' onClick={() => { navigate(-1) }} />

            <div className="flex justify-center item-center">
                <span className='text-2xl font-medium text-amber-700'>-: Order History :-</span>
            </div>

            <hr className='mt-2' />

            <div className="p-3 mt-3 w-full bg-white rounded-2xl flex justify-start items-center gap-3">
                <div className="p-3 w-50 h-25 bg-gray-100 text-center content-center">
                    Total Amount<br />
                    ${total}
                </div>
                <div className="p-3 w-100 h-25 bg-gray-100 text-center content-center">
                    Expected Delivery <br />
                    {dayjs(Date()).format('DD MMMM YYYY')}
                </div>
                <div className="p-3 w-200 h-25 bg-gray-100 text-center content-center">
                    Shipping To <br/>
                    Iscon Atria 1
                </div>
            </div>

            {Object.keys(order).length > 0 ? (
                <>
                    {Object.entries(order).map(([key, item]) => (
                        <div key={key} className='mt-3 p-3 w-full flex justify-start items-start gap-5 bg-white rounded-2xl'>
                            <div className='p-6 w-70 h-fit'>
                                <img src={item.product_image} alt={item.product_title} className='w-fit h-auto' />
                            </div>
                            <div className='w-full flex flex-col'>
                                <span className='font-medium'>{item.product_title}</span>
                                <span>Price : ${item.product_total_price}</span>
                                <span>Quantity : {item.product_quantity}</span>
                                <span>Placed On : {dayjs(item.order_date).format('DD MMMM YYYY hh:mm A')}</span>
                                <span>Estimate Delivery : {dayjs(item.order_delivery_date).format('DD MMMM YYYY hh:mm A')}</span>
                            </div>
                            <div className='w-full flex flex-col text-center items-end'>
                                <label className='m-3 p-2 w-fit h-fit bg-green-500 text-white rounded-xl text-xss'>{item.order_status}</label>
                                
                                <div className="p-3 w-200 h-25 bg-gray-100 ">
                                    
                                    <div className='p-3 w-full h-12 flex justify-between items-center gap-7'>
                                        <div className='p-3 w-full h-12 flex justify-between items-center gap-7'>
                                            <BiSolidPackage
                                                size={30}
                                                color={
                                                    ['Placed', 'Out for Delivery', 'Delivered'].includes(item.order_status)
                                                        ? 'green'
                                                        : 'black'
                                                }
                                            />
                                            <MdLocalShipping
                                                size={30}
                                                color={
                                                    ['Out for Delivery', 'Delivered'].includes(item.order_status)
                                                        ? 'green'
                                                        : 'black'
                                                }
                                            />
                                            <IoLocationSharp
                                                size={30}
                                                color={item.order_status === 'Delivered' ? 'green' : 'black'}
                                            />
                                        </div>

                                    </div>
                                    <div className='bg-white h-1'>
                                        <div
                                            className={`bg-green-600 h-1 ${item.order_status === 'Placed'
                                                ? 'w-1/4'
                                                : item.order_status === 'Dispatch'
                                                    ? 'w-2/4'
                                                    : item.order_status === 'Out for Delivery'
                                                        ? 'w-3/4'
                                                        : item.order_status === 'Delivered'
                                                            ? 'w-full'
                                                            : 'w-0'
                                                }`}
                                        />
                                    </div>
                                    <div className='w-full flex justify-between items-center text-xss'>
                                    <span>Order Received <br /> {dayjs(item.order_date).fromNow()} </span>
                                    <span>Estimeted Delivery <br /> {dayjs().to(item.order_delivery_date)} </span>
                                </div>
                                </div>
                               
                            </div>
                        </div>
                    ))}
                    <hr className='mt-2' />
                </>
            ) : (
                <p className='h-screen m-1 text-2xl font-medium text-amber-700 place-content-center text-center'>No Order Placed Yet</p>
            )}
        </div>
    )
}

export default Orders