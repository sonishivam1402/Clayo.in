import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export const ProductComponent = (props) => {

    const navigate = useNavigate();

    return (
        <div className='p-3 w-70 h-120 sm:w-90 sm:h-110 gap-6 mx-1 bg-white-200 border-2 border-amber-600 shadow-md  shadow-amber-800 rounded-xl flex flex-col items-center justify-center space-x-4'>

            <div className="relative">
                <img src={props.imgsrc || "shopping.webp"} alt={props.imgalt || "shirt"} onClick={() => props.imgclick && props.imgclick()} className='max-w-50 max-h-50 object-cover hover:scale-110' />
                <div className='p-1 w-fit bg-amber-50 border-0 rounded-xl flex items-center justify-evenly absolute bottom-0 left-1'><span className='text-xs'>{props.rating || 3.5}</span> <FaStar color='orange' size={12} /> </div>
            </div>

            <div className='p-2 w-full flex flex-col justify-center items-start text-left gap-1.5'>

                <span className='text-xl font-bold'>{props.title || "Shirt"}</span>

                <p className='text-gray-400'>{props.description} </p>

                <div className="w-full flex justify-between items-center">
                    <span className='font-medium'>Price : ${props.price || 20} </span>
                    
                    <FaShoppingCart className="scale-150 hover:scale-180 cursor-pointer" onClick={props.cart}/>
                </div>

                <div className="flex items-center gap-6 mt-2">
                    <button
                        className="p-2! hover:bg-gray-200! hover:text-black!"
                        onClick={props.subQuan}
                        disabled={props.neqQuan === 0}
                    >
                        -
                    </button>
                    <span>{props.quan}</span>
                    <button
                        className="p-2! hover:bg-gray-200! hover:text-black!"
                        onClick={props.addQuan}
                    >
                        +
                    </button>
                </div>

            </div>

        </div>
    )
}
