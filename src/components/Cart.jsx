import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

export const Cart = () => {

    const [cartItem, setCartItem] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || {};
    });

    useEffect(() => {
        scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleBuy = () => {
        let checkboxes = document.querySelectorAll('input[name="cart"]:checked');
        console.log(checkboxes)
        let values = Array.from(checkboxes).map(cb => cb.value);
        console.log("checkbox : ", values);
        let finalPrice = values.reduce((acc, index) => acc + parseFloat(index), 0);

        alert("Final Price : $" + finalPrice);

        const updatedCart = { ...cartItem };
        let names = Array.from(checkboxes).map(cb => cb.id);
        names.forEach((n) => delete updatedCart[n]); // Removes each product from cart
        const newCart = { ...updatedCart }; // Create a new object to update state

        console.log(newCart)
        setCartItem(newCart); // Update state to re-render
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage

        // localStorage.removeItem("cart"); // Clear cart after buying
    };

    const handleDelete = (name) => {
        console.log(name);
        const updatedCart = { ...cartItem }; // Create a copy of cartItem
        delete updatedCart[name]; // Remove the specific item

        setCartItem(updatedCart); // Update state to re-render
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage
    };

    return (
        <div className='p-6 w-screen h-screen bg-gray-100 text-left'>
            <div className="flex justify-center item-center">
                <span className='text-2xl font-medium text-amber-700'>-: Proceed to Buy :-</span>
            </div>

            <hr className='mt-2' />

            {Object.keys(cartItem).length > 0 ? (
                <>
                    {Object.entries(cartItem).map(([name, item]) => (
                        <div key={name} className='p-3 w-full flex justify-start items-start gap-5'>
                            <input type='checkbox' value={item.Product.price * item.Qty} id={name} name='cart' className='mt-8' defaultChecked />
                            <img src={item.Product.image} alt={item.Product.title} className='w-18 h-20' />
                            <div className='flex flex-col'>
                                <span className='font-medium'>{item.Product.title}</span>
                                <span>Price : ${item.Product.price}</span>
                                <span>Qty : {item.Qty}</span>
                            </div>
                            <div className="w-full">
                                <RxCross2 onClick={() => handleDelete(name)} className="float-end cursor-pointer" />
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
    );
};
