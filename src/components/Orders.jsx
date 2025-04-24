// import React, { useEffect, useState } from 'react'
// import GetOrderDetails from '../utils/api/order/GetOrderDetails';
// import { useNavigate } from 'react-router-dom';
// import { IoMdArrowBack } from "react-icons/io";
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { BiSolidPackage } from "react-icons/bi";
// import { FcShipped } from "react-icons/fc";
// import { MdLocalShipping } from "react-icons/md";
// import { IoLocationSharp } from "react-icons/io5";
// import CancelOrder from '../utils/api/order/CancelOrder';

// dayjs.extend(relativeTime);

// const Orders = () => {

//     const [order, setOrder] = useState({});
//     const [total, setTotal] = useState(0);
//     const navigate = useNavigate();


//     const user = JSON.parse(localStorage.getItem("user"));

//     const loadOrderDetails = async () => {
//         const response = await GetOrderDetails(user.id);
//         if (response) {
//             console.log(response);
//             setOrder(response);
//         }
//     }

//     useEffect(() => {
//         loadOrderDetails();
//     }, []);

//     useEffect(() => {
//         if (order.length > 0) {
//             const total_prices = order.reduce((acc, item) => {
//                 return acc + item.totalAmount;
//             }, 0);

//             setTotal(parseFloat(total_prices.toFixed(2)));
//         }
//     }, [order]);


//     const cancelOrder = async (id) => {
//         const response = await CancelOrder(id);
//         if (response) {
//             alert(response.Message);
//         }
//     }


//     return (
//         <div className='p-6 w-screen  bg-gray-100 text-left'>
//             <IoMdArrowBack size={24} className='hidden sm:block absolute sm:hover:bg-amber-800 sm:rounded-2xl sm:hover:text-white sm:hover:cursor-pointer' onClick={() => { navigate(-1) }} />

//             <div className="flex justify-center item-center">
//                 <span className='text-2xl font-medium text-amber-700'>-: My Orders :-</span>
//             </div>

//             <hr className='mt-2' />

//             {Object.keys(order).length > 0 ? (
//                 <>
//                     {Object.entries(order).map(([key, item]) => (
//                         <div key={key} className='p-3 mt-3 bg-gray-200 rounded-2xl'>

//                             <div className=" p-3 w-full bg-white rounded-2xl sm:flex justify-start items-center gap-x-3">
//                                 <div className="p-3 w-full h-25 bg-gray-100 text-center content-center">
//                                     Total Amount<br />
//                                     <span className='font-medium'>{item.totalAmount}</span>
//                                 </div>
//                                 <div className="p-3 w-full h-25 bg-gray-100 text-center content-center">
//                                     Placed At <br />
//                                     <span className='font-medium'> {dayjs(item.placedAt).format('DD MMMM YYYY, hh:MM A')}</span>

//                                 </div>
//                                 <div className="p-3 w-full h-25 bg-gray-100 text-center content-center">
//                                     Status <br />
//                                     <span className='font-medium'>{item.status}</span>

//                                 </div>
//                                 <div className="p-3 w-full h-25 bg-gray-100 text-center content-center">
//                                     Delivered To <br />
//                                     <span className='font-medium'>Iscon Atria 1, Gotri, Vadodara</span>
//                                 </div>
//                             </div>

//                             {Object.entries(item.orderItems).map(([key, orderItem]) => (
//                                 <>
//                                     <div key={key} className='mt-3 p-3 w-full sm:flex justify-start items-start gap-5 bg-white rounded-2xl'>
//                                         <div className='p-6 w-full sm:w-70 h-fit flex justify-center items-center'>
//                                             <img src={orderItem.image} alt={orderItem.title} className='w-fit h-20 sm:h-auto' />
//                                         </div>
//                                         <div className='w-full sm:flex sm:flex-col'>
//                                             <span className='font-medium'>{orderItem.title}</span>

//                                             <div className=" sm:flex justify-start items-center gap-15">
//                                                 <span className='font-medium'>Price : ${orderItem.price}</span>
//                                                 <br className='sm:hidden' />
//                                                 <span className='font-medium'>Qty : {orderItem.quantity}</span>
//                                             </div>
//                                             {item.status == 'Cancel' ? "" : (
//                                                 <>
//                                                     <span className='font-medium'>Estimated Delivery : {dayjs(item.shippingOrders[key].estimatedDeliveryDate).format('DD MMMM YYYY hh:mm A')}</span>
//                                                     <br className='sm:hidden' />
//                                                     <span className='font-medium'>Tracking Number: {item.shippingOrders[key].trackingNumber}</span>
//                                                     <br className='sm:hidden' />

//                                                     <span className='sm:hidden font-medium'>Status: <span className=' text-green-700'>{item.shippingOrders[key].status}</span></span>
//                                                 </>
//                                             )}

//                                             <div className="py-3 flex justify-between sm:justify-start items-center gap-5">
//                                                 <button className='bg-blue-300! text-white! hover:bg-blue-400!'> View Order</button>
//                                                 {item.status == 'Delivered' || item.status == 'Cancel' ? ""
//                                                     : <button className='bg-red-300! text-white! hover:bg-red-400!' onClick={() => cancelOrder(item.orderId)}> Cancel Order</button>}
//                                             </div>

//                                         </div>
//                                         <div className='w-full flex flex-col text-center items-end'>
//                                             <label className='hidden sm:block m-3 p-2 w-fit h-fit bg-green-500 text-white rounded-xl font-medium text-xss'>{item.status}</label>

//                                             {item.status == 'Cancel' ? "" : (
//                                                 <>
//                                                     <div className="p-3 w-full sm:w-200 h-25 bg-gray-100 ">

//                                                         <div className='p-3 w-full h-12 flex justify-between items-center gap-7'>
//                                                             <div className='p-3 w-full h-12 flex justify-between items-center gap-7'>
//                                                                 <BiSolidPackage
//                                                                     size={30}
//                                                                     color={
//                                                                         ['Placed', 'Out for Delivery', 'Delivered'].includes(item.shippingOrders[key].status)
//                                                                             ? 'green'
//                                                                             : 'black'
//                                                                     }
//                                                                 />
//                                                                 <MdLocalShipping
//                                                                     size={30}
//                                                                     color={
//                                                                         ['Out for Delivery', 'Delivered'].includes(item.shippingOrders[key].status)
//                                                                             ? 'green'
//                                                                             : 'black'
//                                                                     }
//                                                                 />
//                                                                 <IoLocationSharp
//                                                                     size={30}
//                                                                     color={item.order_status === 'Delivered' ? 'green' : 'black'}
//                                                                 />
//                                                             </div>

//                                                         </div>
//                                                         <div className='bg-white h-1'>
//                                                             <div
//                                                                 className={`bg-green-600 h-1 ${item.shippingOrders[key].status === 'Placed'
//                                                                     ? 'w-1/4'
//                                                                     : item.order_status === 'Dispatch'
//                                                                         ? 'w-2/4'
//                                                                         : item.order_status === 'Out for Delivery'
//                                                                             ? 'w-3/4'
//                                                                             : item.order_status === 'Delivered'
//                                                                                 ? 'w-full'
//                                                                                 : 'w-0'
//                                                                     }`}
//                                                             />
//                                                         </div>
//                                                         <div className='w-full flex justify-between items-center text-xss'>
//                                                             <span>Order Received <br /> {dayjs(item.placedAt).fromNow()} </span>
//                                                             <span>Estimated Delivery <br /> {dayjs().to(item.shippingOrders[key].estimatedDeliveryDate)} </span>
//                                                         </div>
//                                                     </div>
//                                                 </>
//                                             )}



//                                         </div>
//                                     </div>
//                                 </>
//                             ))}

//                         </div>
//                     ))}
//                     <hr className='mt-2' />
//                 </>
//             ) : (
//                 <p className='h-screen m-1 text-2xl font-medium text-amber-700 place-content-center text-center'>No Order Placed Yet</p>
//             )}
//         </div>
//     )
// }

// export default Orders