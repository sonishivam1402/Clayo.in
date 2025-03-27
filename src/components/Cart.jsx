import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

export const Cart = () => {

    const {cartItem} = useContext(GlobalContext);
    console.log("on click ",cartItem);

    const cartEntries = Object.entries(cartItem);

  return (
    <div className='w-1/3 h-screen absolute top-20 right-0 bg-white border-2 z-50'>
        {cartEntries ? 
         
         cartEntries.map(([name,item])=> { return <li key={name}>{item.title} : {item.Qty}</li>})
        
        : "No Items in Carts"}
    </div>
  )
}
