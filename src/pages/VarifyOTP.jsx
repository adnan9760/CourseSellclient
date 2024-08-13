import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import signup from '../services/operation/authapi';
import { setSignupData } from '../reducer/slices/authSlice';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the current signup data from Redux
  const currentSignupData = useSelector((state) => state.auth.signupData);
  console.log("Curren",currentSignupData);

  // Handle change in OTP input fields
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const otpCode = otp.join(''); // Combine OTP digits into a single string

    console.log("OTP entered:", otpCode); // Log the OTP

    if (otpCode.length === 6) {
      const updatedSignupData = { ...currentSignupData, otp: otpCode };
      console.log("Updated Signup Data with OTP:", updatedSignupData);
      
     const responce = await dispatch(signup(updatedSignupData));
     if (responce.success) {
      navigate('/login');
    } else {
      // Optionally navigate to the signup page on failure
      navigate('/signup');
    }
    
    }
  };

  return (
    <div className="flex flex-col items-center text-white justify-center h-screen bg-background">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md">
        <div className="flex flex-col mx-auto items-center space-y-1.5 p-6">
          <h3 className="whitespace-nowrap font-semibold text-white tracking-tight text-2xl">
            Verify your account
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email to continue.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <div className="flex mx-auto items-center text-black">
                {otp.map((data, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      name="otp"
                      maxLength="1"
                      className="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md text-center"
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex items-center p-6">
              <button
                type="submit"
                className="inline-flex mx-auto bg-yellow-50 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[50%]"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
