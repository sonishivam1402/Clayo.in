import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import GetCartItem from "../utils/api/cart/GetCartItem";
import DeleteCartItem from "../utils/api/cart/DeleteCartItem";
import placeOrder from '../utils/api/order/placeOrder';
import PageLoader from './ui/PageLoader';
import { toast } from 'react-toastify';

export const Cart = () => {

    const [cartItem, setCartItem] = useState({});
    const [Loading, setLoading] = useState(false)

    const user = JSON.parse(localStorage.getItem("user"));

    const loadCart = async () => {
        const response = await GetCartItem(user.id, user.cartId);
        if (response) {
            //console.log(response);
            setCartItem(response);
        }
    }

    useEffect(() => {
        scrollTo({ top: 0, behavior: 'smooth' });
        loadCart();
    }, []);

    useEffect(() => {
        //console.log("Cart Updated !!")
    }, [cartItem])


    const handleBuy = async () => {
        setLoading(true);
        let checkboxes = document.querySelectorAll('input[name="cart"]:checked');
        console.log(checkboxes);
        if (checkboxes.length > 0) {
            let ids = Array.from(checkboxes).map(cb => cb.id);
            //console.log("checkbox : ", ids);
            let cartItemIds = ids.toString();
            console.log("final ids : ", cartItemIds)

            const response = await placeOrder(user.id, user.email, user.cartId, cartItemIds);
            if (response) {
                toast.success("Order Placed Successfully");
                const updatedCart = { ...cartItem };
                let names = Array.from(checkboxes).map(cb => cb.value);
                names.forEach((n) => delete updatedCart[n]); // Removes each product from cart
                const newCart = { ...updatedCart }; // Create a new object to update state

                console.log(newCart)
                setCartItem(newCart);

            }
        } else {
            toast.error("No item selected");
        }
        setLoading(false);
    };

    const handleDelete = async (index, cartId, productId) => {
        //console.log(id);
        const response = await DeleteCartItem(cartId, productId);
        toast.success(response);

        const updatedCart = { ...cartItem }; // Create a copy of cartItem
        delete updatedCart[index]; // Remove the specific item

        setCartItem(updatedCart);
    };

    return (
        <>
            {Loading && (
                <div className="fixed inset-0 bg-white-10 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
                    <PageLoader title="Processing your Order..."/>
                </div>
            )}

            <div className='p-6 w-screen h-screen bg-gray-100 text-left'>
                <div className="flex justify-center item-center">
                    <span className='text-2xl font-medium text-amber-700'>-: Proceed to Buy :-</span>
                </div>

                <hr className='mt-2' />

                {Object.keys(cartItem).length > 0 ? (
                    <>
                        {Object.entries(cartItem).map(([key, item]) => (
                            <div key={key} className='p-3 w-full flex justify-start items-start gap-5'>
                                <input type='checkbox' value={key} id={item.cartItemId} name='cart' className='mt-8' defaultChecked />
                                <div className="w-20 h-auto">
                                    <img src={item.image} alt={item.title} className='w-fit h-auto' />
                                </div>
                                <div className='w-full flex flex-col'>
                                    <span className='font-medium'>{item.title}</span>
                                    <span>Price : ${item.price}</span>
                                    <span>Qty : {item.quantity}</span>
                                </div>
                                <div className="w-fit">
                                    <RxCross2 onClick={() => handleDelete(key, item.cartItemId, item.productId)} className="float-end cursor-pointer" />
                                </div>
                            </div>
                        ))}
                        <hr />

                        <div>
                            <button className="m-3! p-1! w-20! bg-green-600! text-white! text-xl!" onClick={handleBuy}>
                                Buy
                            </button>
                        </div>
                    </>
                ) : (
                    <p className='h-screen m-1 text-2xl font-medium text-amber-700 place-content-center text-center'>No Item in Cart</p>
                )}
            </div>
        </>
    );
};
