import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddOrUpdateUser from '../utils/api/AddOrUpdateUser';
import OtpVerification from './OtpVerification';
import PageLoader from './ui/PageLoader';
import { toast } from 'react-toastify';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    password_hash: '',
  });
  const [otpUser, setOtpUser] = useState(null);
  const [otpModal, SetOtpModal] = useState(false);
  const [Loading, setLoading] = useState(false)
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
    setLoading(true);
  
    try {
      const result = await AddOrUpdateUser(formData);
      //console.log(result);
      if (result?.message) {
        toast.success(result.message || "Signup successful!");
        setOtpUser({ ...formData, id: result?.data?.id });
        SetOtpModal(true);
      } else {
        // API returned failure
        toast.error(result?.data || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Something went wrong. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>

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

      {Loading && (
        <div className="fixed inset-0 bg-white-10 backdrop-blur-md flex items-center justify-center z-50">
          <PageLoader title="Please wait while we register you." />
        </div>
      )}

      {otpModal && (
        <div className="fixed inset-0 bg-white-10 backdrop-blur-md flex items-center justify-center z-50">
          <OtpVerification user={otpUser} onClose={() => SetOtpModal(false)} />
        </div>
      )}


    </>
  )
}
