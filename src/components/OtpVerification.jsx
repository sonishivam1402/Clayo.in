import React, { useState, useEffect } from 'react';
import VerifyOtp from '../utils/api/VerifyOtp';
import { toast } from 'react-toastify';
import { IoMdArrowBack } from "react-icons/io";
import VerifyEmail from '../utils/api/VerifyEmail';

const OtpVerification = ({ user, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [loading, setLoading] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timer === 0) return; // Stop timer at 0
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Format the timer into minutes:seconds
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus backward on Backspace
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const enteredOtp = otp.join('');
      const response = await VerifyOtp(enteredOtp, user.email);
      
      console.log("OTP Response:", response);
      
      // If verification is successful
      if (response) {
        toast.success("Email verified successfully!");
        
        // Use the onSuccess callback if provided, otherwise fall back to onClose
        if (typeof onSuccess === 'function') {
          // Call onSuccess with a slight delay to ensure toast is visible
          setTimeout(() => {
            onSuccess();
          }, 500);
        } else {
          onClose();
        }
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    
    toast.info('Sending new verification code...');
    // Reset timer
    setTimer(300);
    const result = await VerifyEmail(user.email);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-light tracking-wider text-amber-900">VERIFY YOUR EMAIL</h1>
        <div className="h-px w-16 bg-amber-700 mx-auto my-3"></div>
        <p className="text-gray-600 mt-4">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-amber-900 font-medium">{user.email}</p>
      </div>

      <div className="text-center mb-8">
        <span className="text-sm uppercase tracking-wider text-gray-500">Time Remaining: </span>
        <span className="font-medium text-amber-800">{formatTimer()}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl border-b-2 border-amber-800/30 bg-transparent focus:outline-none focus:border-amber-600 transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join('').length !== 6}
          className={`w-full bg-amber-800 text-white py-3 rounded text-sm uppercase tracking-wider font-light 
            ${loading || otp.join('').length !== 6 ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-900'} transition-all`}
        >
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <div className="flex items-center justify-between mt-8">
        <button 
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
        >
          <IoMdArrowBack size={14} /> Back
        </button>
        
        <button 
          onClick={handleResendCode}
          disabled={timer > 270} // Disable resend for first 30 seconds
          className={`text-sm text-amber-800 font-medium transition-colors
            ${timer > 270 ? 'opacity-50 cursor-not-allowed' : 'hover:text-amber-900 hover:underline'}`}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;