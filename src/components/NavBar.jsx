import React, { useState, useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { UserProfile } from './UserProfile';
import { Cart } from './Cart';
import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
    const [openCart, setOpenCart] = useState(false);
    const [menu, setMenu] = useState(false);
    const [username, setUserName] = useState("")
    const [userImage, setImage] = useState("")
    const location = useLocation();
    
    // Instead of managing activeNav as a state that's manually updated,
    // derive it from the current path
    const currentPath = location.pathname;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user")) || {userName: "Guest", profileImage:"/avatar.jpg"};
        setUserName(user.userName);
        setImage(user.profileImage || "/avatar.jpg")
    }, [location.pathname]);
    

    const navItems = [
        { name: "Men", href: "/men" },
        { name: "Women", href: "/women" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "About", href: "/about" },
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
                                <Link
                                    to={n.href}
                                    key={i}
                                    onClick={() => setMenu(false)} 
                                >
                                    <li className={currentPath === n.href ? "text-amber-700 font-bold" : "hover:text-amber-700 hover:font-bold"}>
                                        {n.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div>
               <Link to="/" onClick={()=>setMenu(false)}> <span className='text-2xl font-bold text-amber-700 font-serif'>Clayo.</span></Link>
            </div>

            <div className='hidden sm:flex sm:justify-between sm:items-center sm:gap-5'>

                <ul className='md:gap-16 flex justify-between items-center'>
                    {navItems.map((n, i) => (
                        <Link
                            to={n.href}
                            key={i}
                        >
                            <li className={currentPath === n.href ? "text-amber-700 font-bold" : "hover:text-amber-700 hover:font-bold"}>
                                {n.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className='flex justify-between items-center gap-5'>
                <Link to="/cart">
                <IoCartOutline
                    size={22}
                    className='hover:scale-120 hover:cursor-pointer'
                />
                </Link>
                
                <div className='flex justify-between items-center gap-2'>
                <UserProfile name={username} image={userImage}/>
                </div>
            </div>

            {openCart && <Cart />}
        </div>
    );
};