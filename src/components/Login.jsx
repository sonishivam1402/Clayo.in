
import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginAuth from '../utils/api/LoginAuth';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.token) {
      // Optional: validate token expiration here as well
      navigate('/'); // or /dashboard or wherever
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await LoginAuth(email, password);
    console.log("user", user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) {
        localStorage.setItem('authToken', user.token);
      }
      if (user.refreshToken) {
        localStorage.setItem('refreshToken', user.refreshToken);
      }
      navigate("/");
    }
  }

  return (
    <div className="p-6 w-screen h-screen bg-[url('/summer.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/90 shadow-2xl rounded-lg p-12 w-full max-w-md flex flex-col">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-light tracking-wider text-amber-900">Clayo</h1>
          <div className="h-px w-16 bg-amber-700 mx-auto my-3"></div>
          <h2 className="text-xl font-light text-gray-700">Welcome Back</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 pl-1">Email Address</label>
            <input
              className="p-3 border-b border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 pl-1">Password</label>
            <input
              className="p-3 border-b border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-amber-800 text-white py-3 rounded hover:bg-amber-900 transition-all uppercase tracking-wider text-sm font-light"
          >
            Sign In
          </button>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?
            <span className="text-amber-800 hover:text-amber-900 cursor-pointer ml-2" onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}