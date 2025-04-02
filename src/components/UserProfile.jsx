import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const UserProfile = () => {

    const [active, setActive] = useState(false)

    const options = [
        { id: 1, name: "Profile" , to:"/profile"},
        { id: 2, name: "Setting" ,to:"/setting"},
        { id: 3, name: "Logout" ,to:"/login"}
    ]


    const handleClick = () => {
        active ? setActive(false) : setActive(true);
        
    }

    return (
        <div>
            <FaUserCircle size={28} color='brown' className='relative hover:scale-120 hover:cursor-pointer' onClick={handleClick} />
            {active ? (
                <div className='w-30 h-30 p-3 absolute top-16 right-6 text-left bg-white text-black border-1 rounded-2xl '>
                    <ul>
                        {options.map((option) => { return <Link to={option.to}><li key={option.id} className='p-1 hover:text-amber-900' onClick={()=>{handleClick(),option.name=="Logout"?localStorage.removeItem("user"):""}}>{option.name}</li></Link> })}
                    </ul>
                </div>
            ) : (
                "")}
        </div>
    )
}
