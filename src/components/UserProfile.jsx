import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSortDown , FaUser , FaShoppingBag, } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { BiLogIn, BiLogOut  } from "react-icons/bi";
import Logout from '../utils/api/Logout';
import { toast } from 'react-toastify';

export const UserProfile = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    const options = [
        { 
            id: 1, 
            name: "Profile", 
            to: "/profile", 
            icon: <FaUser size={16} className="text-gray-600" />
        },
        { 
            id: 2, 
            name: "Orders", 
            to: "/order", 
            icon: <FaShoppingBag size={16} className="text-gray-600" />
        },
        { 
            id: 3, 
            name: "Settings", 
            to: "/setting", 
            icon: <MdSettings size={16} className="text-gray-600" />
        },
        { 
            id: 4, 
            name: props.name === "Guest" ? "Login" : "Logout", 
            to: "/login", 
            icon: props.name === "Guest" ? 
                <BiLogIn size={16} className="text-gray-600" /> : 
                <BiLogOut size={16} className="text-gray-600" />
        }
    ];

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current && 
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        // Add event listener when dropdown is open
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    const handleLogout = async () => {
        try {
            const response = await Logout();
            if (response) {
                toast.success(response.message);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    const handleOptionClick = (optionName) => {
        setIsOpen(false);
        if (optionName === "Logout") {
            handleLogout();
        }
    };

    return (
        <div className="relative">
            {/* Profile button */}
            <div 
                ref={buttonRef}
                className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-full transition-all hover:bg-gray-100"
                onClick={toggleDropdown}
            >
                <div className="relative">
                    {props.image ? (
                        <img 
                            src={props.image} 
                            alt={props.name} 
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-200">
                            <FaUser size={16} />
                        </div>
                    )}
                </div>
                {/* <span className="hidden sm:block font-medium text-gray-700 max-w-[100px] truncate">
                    {props.name || 'Guest'}
                </span> */}
                <FaSortDown 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
                />
            </div>
            
            {/* Dropdown menu */}
            {isOpen && (
                <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-52 rounded-lg shadow-lg py-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    style={{
                        transformOrigin: 'top right',
                        animation: 'dropdownFade 0.15s ease-out forwards'
                    }}
                >
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                            {props.name || 'Guest'}
                        </p>
                        {props.email && (
                            <p className="text-xs text-gray-500 truncate">
                                {props.email}
                            </p>
                        )}
                    </div>
                    
                    <div className="py-1">
                        {options.map((option) => (
                            <Link 
                                key={option.id} 
                                to={option.to}
                                className="block"
                                onClick={() => handleOptionClick(option.name)}
                            >
                                <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <span className="mr-3">{option.icon}</span>
                                    {option.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            
            {/* CSS for animation */}
            <style jsx="true">{`
                @keyframes dropdownFade {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};