import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export const CardComponent = (props) => {

    // const colors = {
    //     orange: "#F2C265",
    //     grey: "a9a9a9"
    // }
    // const stars = Array(5).fill(0)

    return (
        <div className='m-3 p-3 w-90 h-106 gap-6 mx-auto bg-white-200 border-2 border-amber-600 shadow-md  shadow-amber-800 rounded-xl flex flex-col items-center justify-center space-x-4'>
            <div className="relative">
                <img src={props.imgsrc || "shopping.webp"} alt={props.imgalt || "shirt"} className='max-w-50 max-h-50 object-cover hover:scale-110' />
                <div className='p-1 w-fit bg-amber-50 border-1 rounded-xl flex items-center justify-evenly absolute bottom-0 left-1'><span>{props.rating || 3.5}</span> <FaStar color='orange' /> </div>
            </div>
            <div className='p-2 flex flex-col justify-center items-start text-left gap-1.5'>

                <span className='text-2xl font-bold font-mono'>{props.title || "Shirt"}</span>

                <p className='text-gray-400'>{props.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit."} </p>
                {/* <div className='flex'>
                    {stars.map((_, index) => {
                        return (

                            <FaStar
                                key={index}
                                size={16}
                                color={3 > index ? colors.orange : colors.grey}
                            />

                        )
                    })}
                </div> */}
                <div className="w-full flex justify-between items-center">
                    <span className='font-medium'>Price : ${props.price || 20} </span>
                    <FaShoppingCart className="scale-150 hover:scale-180" />
                </div>
            </div>
        </div>
    )
}
