import React, { useState } from 'react'

export default function ResetPassword() {
  const[updatepass,setupdatepass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(password);
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword(password)) {
        console.log("Password is valid, proceed with form submission.");
    
    } else {
        setErrorMessage("Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.");
    }
    
};
  return (
    <div>
        <div>
            <h1>
                {
                    !updatepass ? "Choose new Password" : "Reset Completed"
                }
            </h1>
           <p>
            {
                !updatepass ? "Almost Done Enter your new Password" : "Your password has been reset successfully"

            }
           </p>
           <form onSubmit={handleSubmit}>
            {
                !updatepass  && (
                    <label className="w-full mt-6">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                        Password
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        type="password"
                        required
                        value={password}
                        placeholder="Enter your new Password"
                        onChange={changeHandler}
                        name="password"
                        className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                    />
                </label>
                )
            }

            {
                !updatepass && (
                    <label className="w-full mt-6">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                        Confirm PassWord
                        <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        type="confirmpassword"
                        required
                        value={confirmpassword}
                        placeholder="Re-Enter your new Password"
                        onChange={changeHandler}
                        name="confirmpassword"
                        className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                    />
                </label>
                )

            }

{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
           </form>
        </div>
    </div>
  )
}
