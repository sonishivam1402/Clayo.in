import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import { RxCross2 } from "react-icons/rx";

export const Cart = () => {

    const { cartItem } = useContext(GlobalContext);
    const cartEntries = Object.entries(cartItem);

    const handleBuy = () => {
        let checkboxes = document.querySelectorAll('input[name="cart"]:checked');
        let values = Array.from(checkboxes).map(cb => cb.value);
        let finalPrice = values.reduce((acc,index)=>{

          return  acc + parseFloat(index);
        },0)

        alert("Final Price : $"+ finalPrice);
    }

    return (
        <div className='w-1/3 h-screen p-3 absolute top-20 right-0 bg-white border-2 z-50 text-left'>
                <div className="flex justify-between item-center">
                <span className=' text-2xl font-medium'>Cart</span>
                </div>
                
                <hr className='mt-2'/>
            
            {cartEntries ? 

                cartEntries.map(([name, item]) => {
                    return (
                        <>
                        <div key={name} className='p-3 w-full flex justify-start items-start gap-5'>
                            <input type='checkbox' value={item.Product.price*item.Qty} name='cart' className='mt-8' defaultChecked/>
                            <img src={item.Product.image} alt={item.Product.title} className='w-18 h-20'/>
                            <div className='flex flex-col'>
                            <span className='font-medium'>{item.Product.title}</span>
                            <span>Price : ${item.Product.price}</span>
                            <span>Qty : {item.Qty}</span>

                            </div>
                        </div>
                        <hr></hr>
                        
                        </>
                    )
                })
                

                : "No Items in Carts"}
                <button className="m-3! p-2! w-50! bg-green-600! text-white! text-xl!" onClick={handleBuy}>Proceed To Buy </button>

        </div>
    )
}
