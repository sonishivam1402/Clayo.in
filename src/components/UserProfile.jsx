import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";

export const UserProfile = () => {

    const [active, setActive] = useState(false)

    const options = [
        { id: 1, name: "Profile" },
        { id: 2, name: "Setting" },
        { id: 3, name: "Logout" }
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
                        {options.map((option) => { return <a href='#'><li key={option.id} className='p-1 hover:text-amber-900' onClick={()=>alert(option.name)}>{option.name}</li></a> })}
                    </ul>
                </div>
            ) : (
                "")}
        </div>
    )
}
