import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../utils/api/Logout';
import { toast } from 'react-toastify';

export const UserProfile = (props) => {

    const [active, setActive] = useState(false)
    const navigate = useNavigate();

    const options = [
        { id: 1, name: "Profile" , to:"/profile"},
        { id: 2, name: "Orders" , to:"/order"},
        { id: 3, name: "Setting" ,to:"/setting"},
        { id: 4, name: props.name == "Guest" ? "Login" : "Logout" ,to:"/login"}
    ]


    const handleClick = () => {
        active ? setActive(false) : setActive(true);    
    }
    
    const handleLogout = async() => {
        console.log("logout");
        const response = await Logout();
        if(response){
            toast.success(response.message);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/login");
        }
    }


    return (
        <div>
            <div className="flex gap-2 hover:cursor-pointer justify-between items-center" onClick={handleClick}>
            <img src={props.image} alt="" className='w-8 h-8 relative rounded-2xl hover:scale-120'/>
            <span className='hidden sm:block'>{props.name}</span>
            </div>
            
            {active ? (
                <div className='w-30 h-fit p-3 absolute top-16 right-6 text-left bg-white text-black border-1 rounded-2xl '>
                    <ul>
                        {options.map((option) => { return <Link key={option.id} to={option.to}><li  className='p-1 hover:text-amber-900' onClick={()=>{handleClick(),option.name=="Logout"?handleLogout():""}}>{option.name}</li></Link> })}
                    </ul>
                </div>
            ) : (
                "")}
        </div>
    )
}
