import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import MapComponent from './MapComponent';

export const Footer = () => {
    return (
        <>
        <div className='p-6 w-screen h-120 sm:h-80 bg-white sm:flex  sm:justify-between sm:items-center text-amber-700 '>
            <div className="w-full sm:w-1/5 flex sm:flex-col justify-between items-center gap-8">
                <h1>Clayo.</h1>
                <div className="flex justify-between item-center gap-5 text-2xl">
                    <FaInstagram className='cursor-pointer hover:scale-150'/>
                    <FaFacebookF className='cursor-pointer hover:scale-150'/>
                    <IoLogoYoutube className='cursor-pointer hover:scale-150'/>
                </div>
            </div>
            <div className="my-5 sm:my-0 sm:w-2/5 text-left flex justify-between sm:justify-around items-center ">
                <ul className='flex flex-col gap-2'>
                    <li>Privacy Policy</li>
                    <li>Refund Policy</li>
                    <li>Shipping Policy</li>
                    <li>Terms of Service</li>
                </ul>
         
                <ul className='flex flex-col gap-2'>
                    <li>New Arrivals</li>
                    <li>Style</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            
            <div className="w-full sm:w-2/5 -z-0">
                <MapComponent/>
            </div>

        </div>
        <span className='text-amber-900'>Copyright © 2025 Clayo. Developed by <a href='https://github.com/sonishivam1402'>Shivam Soni.</a></span>
        </>
    )
}
