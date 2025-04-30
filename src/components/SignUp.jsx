import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddOrUpdateUser from '../utils/api/AddOrUpdateUser';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    password_hash:'',
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.token) {
      // Optional: validate token expiration here as well
      navigate('/'); // or /dashboard or wherever
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const result = await AddOrUpdateUser(formData)
    if (result) {
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
          type="text" placeholder="Name" name="name" value={formData.name} onChange={handleFormChange} required
        />

        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="email" placeholder="Email" name="email" value={formData.email} onChange={handleFormChange} required
        />

        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="number" placeholder="Mobile No" name="mobile_no" value={formData.mobile_no} onChange={handleFormChange} required
        />

        <input
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          type="password" placeholder="Password" name="password_hash" value={formData.password_hash} onChange={handleFormChange} required
        />

        <button
          type="submit"
          className="btn bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition"
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
