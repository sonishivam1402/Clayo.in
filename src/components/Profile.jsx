import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

const Profile = () => {
    //const { user } = useContext(GlobalContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user, navigate]); 

    if (!user) return null; 

    return (
        <div className="w-screen p-6 shadow-lg rounded-lg mt-10">
            <div className="flex items-center space-x-6">
                <img
                    src={"vite.svg"}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border-2 border-gray-300"
                />
                <div className="text-left text-amber-800">
                    <h2 className="text-2xl font-semibold">Name: {user.name}</h2>
                    <h2 className="text-xl font-semibold">Email: {user.email}</h2>
                    <h2 className="text-xl font-semibold">Mobile No: {user.mobileNo}</h2>
                    <button className="mt-2 px-4 py-2 border-2 border-amber-800 rounded-lg hover:bg-amber-800 hover:text-white transition">
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Order History</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700">Order #12345 - <span className="font-semibold">$120.00</span></p>
                    <p className="text-sm text-gray-500">Status: Delivered</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mt-2">
                    <p className="text-gray-700">Order #67890 - <span className="font-semibold">$85.00</span></p>
                    <p className="text-sm text-gray-500">Status: Shipped</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
