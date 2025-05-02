import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerifyOtp from '../utils/api/VerifyOtp';
import { toast } from 'react-toastify';

const OtpVerification = ({user, onClose}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const navigate = useNavigate();

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
    //if (isNaN(value)) return; // Only numbers allowed
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
    const enteredOtp = otp.join('');
    const response = await VerifyOtp(enteredOtp, user.id);
    if(response){
      toast.success(response.message);
      onClose();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white-10 backdrop-blur-md px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full">
        <h3 className="text-1xl font-bold text-center text-amber-800 mb-4">Hey, {user.name} !!</h3>
        <h1 className="text-3xl font-bold text-center text-amber-800 mb-4">Verify Your OTP</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit code we sent to your email address
        </p>

        <div className="text-center mb-8">
          <span className="text-sm text-gray-600">Time Remaining: </span>
          <span className="font-semibold text-amber-800">{formatTimer()}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center gap-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-3 rounded-xl text-lg font-semibold hover:bg-amber-900 transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Didn’t get the code?{' '}
          <span className="text-amber-800 font-medium cursor-pointer hover:underline">
            Resend Code
          </span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
