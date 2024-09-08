import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { forgetpassword } from '../services/operation/authapi';

export default function ForgetPassword() {
    const[email,setEmail] = useState("");
    const[sentMail,setSentMail] = useState(false);
    const dispatch = useDispatch();

    const changeHandler = (e)=>{
        setEmail(e.target.value);
    }

    const submitHandle =(e)=>{
        e.preventDefault();
        console.log("sub",email);
           const res = dispatch(forgetpassword({email,setSentMail}))
    }

    return (
        <div className='flex flex-col mt-[10%]  items-center justify-center'>
            <div className='mx-auto items-center w-[25%] justify-center text-white '>
                <h1 className='text-[30px] font-extrabold'>
                    {!sentMail ? "Reset Your Password" : "Check Email"}
                </h1>
                <p className='text-[15px] mt-6 gap-y-2 '>
                    {!sentMail ? 
                        "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery" :
                        `We have sent the Reset Email to ${email}`
                    }
                </p>
                <form onSubmit={submitHandle} className='mt-6'>
                    {!sentMail && (
                        <label className="w-full mt-6">
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                                Email Address
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                type="email"
                                required
                                value={email}
                                placeholder="Enter your email address"
                                onChange={changeHandler}
                                name="email"
                                className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                            />
                        </label>
                    )}
                    <button type="submit" className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full">
                        {!sentMail ? "Reset Password" : "Resend Email"}
                    </button>
                </form>
            </div>
        </div>
    )
}
