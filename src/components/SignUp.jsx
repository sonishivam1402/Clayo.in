import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserRegistration from '../utils/api/UserRegistration';

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await UserRegistration(name,email,mobileNo,password)
    if(result){
      alert(result.message);
      navigate("/login"); 
    }
    
  }

  return (
    <div className="p-6 w-screen h-screen bg-[url('/summer.jpg')] bg-cover bg-center flex items-center justify-start">
      <form onSubmit={handleSignup} className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-amber-700 text-center">Create Account</h2>
        
        <input 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required
        />

        <input 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
        />

        <input 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="number" placeholder="Mobile No" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required
        />

        <input 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
        />

        <button 
          type="submit"
          className="bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account? 
          <span className="text-amber-700 hover:underline cursor-pointer ml-1" onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  )
}
