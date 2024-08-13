import React from "react";
import apiconnector from "../apiconnector";
import { catagories } from "../apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../reducer/slices/authSlice";

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiconnector("POST", catagories.SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("otp", response.data);
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verifyotp");
      return response.data;
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
  };
}

export default function signup(
  {
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    otp
  }
  
) {
  return async (dispatch) => {
    try {
      const response = await apiconnector("POST", catagories.SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        accountType,
        otp,
      });

      console.log("response", response);

      if (!response.data.data) {
        throw new Error(response.data.message);
      }

    
      toast.success("Successful Register");
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.message || error);
      toast.error("Signup failed: " + (error.message || "Unknown error"));

      return { success: false, message: error.message || "Signup failed" };
    }
  };
}
export  function Login({email,password}) {
  console.log("Hello World!");
  return async (dispatch) =>{
    try {
      const response = await apiconnector("POST",catagories.LOGIN_API,{
        email,
        password
      });
      console.log("response",response);
      if (!response.data.data) {
        throw new Error(response.data.message);
        }
        setToken(localStorage.setItem("token",response.data.token));
        toast.success("Successful Login");
        return response.data;


    } catch (error) {

      
    }
  }
}
