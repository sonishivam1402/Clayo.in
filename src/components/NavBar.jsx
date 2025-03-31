import React, { useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { UserProfile } from './UserProfile';
import { Cart } from './Cart';

export const NavBar = () => {
    const [openCart, setOpenCart] = useState(false);
    const [activeNav, setActiveNav] = useState("#home"); // Track active nav item
    const [menu, setMenu] = useState(false);

    const navItems = [
        { name: "Home", href: "#home" },
        { name: "New Arrivals", href: "#newArrival" },
        { name: "Style", href: "#style" },
        { name: "About", href: "#about" },
    ];

    return (
        <div className='p-6 w-screen flex justify-between items-center sticky top-0 bg-white z-50'>
            <div className="sm:hidden relative">
                <GiHamburgerMenu onClick={() => { setMenu(!menu) }} />
                {menu && (
                    <div className='p-6 m-0 w-100 h-70 bg-white absolute -top-5 z-10 -left-10 rounded-2xl text-left'>
                       
                        <RxCross2  className='mb-5' size={24} onClick={()=>{setMenu(false)}}/>
                        
                        
                        <ul className=' flex flex-col justify-between items-start gap-3'>
                            {navItems.map((n, i) => (
                                <a
                                    href={n.href}
                                    key={i}
                                    onClick={() => setActiveNav(n.href)} // Update activeNav state
                                >
                                    <li className={activeNav === n.href ? "text-amber-700 font-bold" : "hover:text-amber-700 hover:font-bold"}>
                                        {n.name}
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <span className='text-2xl font-bold text-amber-700 font-serif'>Clayo.</span>
            </div>

            <div className='hidden sm:flex sm:justify-between sm:items-center sm:gap-5'>

                <ul className='md:gap-16 flex justify-between items-center'>
                    {navItems.map((n, i) => (
                        <a
                            href={n.href}
                            key={i}
                            onClick={() => setActiveNav(n.href)} // Update activeNav state
                        >
                            <li className={activeNav === n.href ? "text-amber-700 font-bold" : "hover:text-amber-700 hover:font-bold"}>
                                {n.name}
                            </li>
                        </a>
                    ))}
                </ul>
            </div>

            <div className='flex justify-between items-center gap-5'>
                <IoCartOutline
                    size={22}
                    className='hover:scale-120 hover:cursor-pointer'
                    onClick={() => setOpenCart(!openCart)}
                />
                <UserProfile />
            </div>

            {openCart && <Cart />}
        </div>
    );
};
