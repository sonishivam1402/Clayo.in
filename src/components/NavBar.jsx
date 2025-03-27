import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { UserProfile } from './UserProfile';

export const NavBar = () => {

    const navItems = [
        { name: "Home", href: "#", current: true },
        { name: "New Arrivals", href: "#", current: false },
        { name: "Style", href: "#", current: false },
        { name: "About", href: "#", current: false },
    ]

    return (
        <div className='p-6 w-screen flex justify-between items-center sticky top-0 bg-white'>
            <div>
                <span className='text-2xl font-bold text-amber-700 font-serif'>Clayo.</span>
            </div>
            
            <div className='flex justify-between items-center gap-5'>
                <ul className='gap-16 flex justify-between items-center'>
                    {navItems.map((n, i) => { return <a href={n.href} key={i}><li className={n.current?"text-amber-700 font-bold":"hover:text-amber-700 hover:font-bold"  } >{n.name}</li></a> })}
                </ul>
            </div>

            <div className='flex justify-between items-center gap-5'>
                <IoCartOutline size={22} className='hover:scale-120 hover:cursor-pointer' />
                <UserProfile />
            </div>
        </div>
    )
}
