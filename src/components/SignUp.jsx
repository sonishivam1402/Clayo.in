import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddOrUpdateUser from '../utils/api/AddOrUpdateUser';
import OtpVerification from './OtpVerification';
import PageLoader from './ui/PageLoader';
import { toast } from 'react-toastify';
import VerifyEmail from '../utils/api/VerifyEmail';

export const Signup = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: Profile Details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    password_hash: '',
  });
  const [otpUser, setOtpUser] = useState(null);
  const [otpModal, setOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    
    if (user && user.token) {
      navigate('/');
    }
  }, [navigate]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // We only send email for verification
      //const emailOnlyData = { email: formData.email };
      const result = await VerifyEmail(formData.email);
      
      console.log("Email verification result:", result); // Log to debug
      
      if (result && result.message) {
        toast.success("Verification code sent to your email");
        setOtpUser({ 
          email: formData.email
        });
        setOtpModal(true);
      } else {
        toast.error(result?.error || "Email verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Email Verification Error:", error);
      toast.error("Something went wrong. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Send the complete user data without ID
      const result = await AddOrUpdateUser(formData);
      
      console.log("Registration result:", result); // Log to debug
      
      // Check if response exists (successful API call)
      if (result) {
        toast.success("Account created successfully!");
        
        // Force navigation to login after short delay
        setTimeout(() => {
          setLoading(false); // Ensure loading is off before navigation
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        toast.error("Registration failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Something went wrong. Please check your internet and try again.");
      setLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    setOtpModal(false);
    // Add success toast for better feedback
    toast.success("Email verified successfully!");
    // Move to profile completion step
    setStep(2);
  };
  
  return (
    <>
      <div className="p-6 w-screen h-screen bg-[url('/summer.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-white/90 shadow-2xl rounded-lg p-12 w-full max-w-md flex flex-col">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-light tracking-wider text-amber-900">Clayo</h1>
            <div className="h-px w-16 bg-amber-700 mx-auto my-3"></div>
            <h2 className="text-xl font-light text-gray-700">
              {step === 1 ? "Begin Your Journey" : "Complete Your Profile"}
            </h2>
          </div>

          {step === 1 ? (
            <form onSubmit={handleVerifyEmail} className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 pl-1">Email Address</label>
                <input
                  className="p-3 border-b border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleFormChange} 
                  required
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                className="mt-4 bg-amber-800 text-white py-3 rounded hover:bg-amber-900 transition-all uppercase tracking-wider text-sm font-light"
              >
                Verify Email
              </button>

              <p className="text-sm text-center text-gray-600 mt-6">
                Already have an account?
                <span className="text-amber-800 hover:text-amber-900 cursor-pointer ml-2" onClick={() => navigate("/login")}>Sign In</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleCompleteSignup} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 pl-1">Full Name</label>
                <input
                  className="p-3 border-b border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
                  type="text" 
                  placeholder="John Doe" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleFormChange} 
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 pl-1">Mobile Number</label>
                <input
                  className="p-3 border-b border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
                  type="tel" 
                  placeholder="(123) 456-7890" 
                  name="mobile_no" 
                  value={formData.mobile_no} 
                  onChange={handleFormChange} 
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-1 pl-1">Set Password</label>
                <input
                  className="p-3 border-b border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
                  type="password" 
                  placeholder="Minimum 8 characters" 
                  name="password_hash" 
                  value={formData.password_hash} 
                  onChange={handleFormChange} 
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-amber-800 text-white py-3 rounded hover:bg-amber-900 transition-all uppercase tracking-wider text-sm font-light"
              >
                Complete Registration
              </button>
            </form>
          )}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <PageLoader title={step === 1 ? "Verifying your email..." : "Creating your account..."} />
        </div>
      )}

      {otpModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <OtpVerification 
            user={otpUser} 
            onClose={() => setOtpModal(false)}
            onSuccess={handleOtpSuccess}
          />
        </div>
      )}
    </>
  )
}