import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
import { RxCross2 } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";

export const Cart = () => {

    const { cartItem } = useContext(GlobalContext);
    const cartEntries = Object.entries(cartItem);
    const [animate, setAnimate] = useState(false)

    const handleBuy = () => {
        let checkboxes = document.querySelectorAll('input[name="cart"]:checked');
        let values = Array.from(checkboxes).map(cb => cb.value);
        let finalPrice = values.reduce((acc, index) => {

            return acc + parseFloat(index);
        }, 0)

        alert("Final Price : $" + finalPrice);
        setAnimate(true)
        setTimeout(() => setAnimate(false), 2000)
    }

    return (
        <div className='p-6 w-full sm:w-screen h-screen bg-white text-left'>
            <div className="flex justify-between item-center">
                <span className='text-2xl font-medium text-amber-700'>Cart</span>
            </div>

            <hr className='mt-2' />

            {cartEntries && cartEntries.length > 0 ? (
                <>
                    {cartEntries.map(([name, item]) => (
                        <div key={name} className='p-3 w-full flex justify-start items-start gap-5'>
                            <input type='checkbox' value={item.Product.price * item.Qty} name='cart' className='mt-8' defaultChecked />
                            <img src={item.Product.image} alt={item.Product.title} className='w-18 h-20' />
                            <div className='flex flex-col'>
                                <span className='font-medium'>{item.Product.title}</span>
                                <span>Price : ${item.Product.price}</span>
                                <span>Qty : {item.Qty}</span>
                            </div>
                        </div>
                    ))}
                    <hr />

                    <div>
                        <button className="m-3! p-3! w-50! bg-green-600! text-white! text-xl!" onClick={handleBuy}>
                            Proceed To Buy
                        </button>
                        
                    </div>
                </>
            ) : (
                <p className='m-1 text-2xl font-medium text-amber-700'>No Item in Cart</p>
            )}

        </div>

    )
}
