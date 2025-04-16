import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginAuth from '../utils/api/LoginAuth';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await LoginAuth(email,password);
    console.log("user" , user)
    if(user){
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  }

  return (
    <div className="p-6 w-screen h-screen bg-[url('/summer.jpg')] bg-cover bg-center flex items-center justify-start">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-amber-700 text-center">Welcome Back!</h2>

        <input 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
        />

        <input 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
        />

        <button 
          type="submit"
          className="bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account? 
          <span className="text-amber-700 hover:underline cursor-pointer ml-1" onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  )
}
