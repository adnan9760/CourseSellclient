import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/operation/authapi";
import { setSignupData } from "../reducer/slices/authSlice";

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const setIsLoggedIn = props.setIsLoggedIn;
  const navigate = useNavigate();

  const [showCreatePass, setShowCreatePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [accountType, setAccountType] = useState("student");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // --- Validators ---
  const validators = {
    firstName: (v) => {
      if (!v.trim()) return "First name is required";
      if (v.trim().length < 2) return "First name must be at least 2 characters";
      if (!/^[a-zA-Z\s'-]+$/.test(v)) return "First name contains invalid characters";
      return "";
    },
    lastName: (v) => {
      if (!v.trim()) return "Last name is required";
      if (v.trim().length < 2) return "Last name must be at least 2 characters";
      if (!/^[a-zA-Z\s'-]+$/.test(v)) return "Last name contains invalid characters";
      return "";
    },
    email: (v) => {
      if (!v) return "Email address is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address";
      return "";
    },
    password: (v) => {
      if (!v) return "Password is required";
      if (v.length < 8) return "Password must be at least 8 characters";
      if (!/[A-Z]/.test(v)) return "Password must contain at least one uppercase letter";
      if (!/[0-9]/.test(v)) return "Password must contain at least one number";
      if (!/[!@#$%^&*]/.test(v)) return "Password must contain at least one special character (!@#$%^&*)";
      return "";
    },
    confirmpassword: (v, password) => {
      if (!v) return "Please confirm your password";
      if (v !== password) return "Passwords do not match";
      return "";
    },
  };

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation — revalidate confirmpassword when password changes
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validators.password(value),
        confirmpassword: formData.confirmpassword
          ? validators.confirmpassword(formData.confirmpassword, value)
          : prev.confirmpassword,
      }));
    } else if (name === "confirmpassword") {
      setErrors((prev) => ({
        ...prev,
        confirmpassword: validators.confirmpassword(value, formData.password),
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: validators[name]?.(value) || "" }));
    }
  }

  const validateForm = () => {
    const newErrors = {
      firstName: validators.firstName(formData.firstName),
      lastName: validators.lastName(formData.lastName),
      email: validators.email(formData.email),
      password: validators.password(formData.password),
      confirmpassword: validators.confirmpassword(formData.confirmpassword, formData.password),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }
    const signupData = { ...formData, accountType };
    try {
      dispatch(setSignupData(signupData));
      dispatch(sendOtp(signupData.email, navigate));
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  // Reusable error message component
  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-pink-200 text-xs mt-1">{errors[field]}</p>
    ) : null;

  // Helper for input border highlight
  const inputClass = (field) =>
    `bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 border ${
      errors[field] ? "border-pink-200" : "border-transparent"
    }`;

  return (
    <div>
      {/* Account type toggle */}
      <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max">
        <button
          type="button"
          onClick={() => setAccountType("student")}
          className={`${
            accountType === "student"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all`}
        >
          Student
        </button>
        <button
          type="button"
          onClick={() => setAccountType("instructor")}
          className={`${
            accountType === "instructor"
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 px-5 rounded-full transition-all`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} noValidate>
        {/* First & Last name */}
        <div className="flex gap-x-4 mt-4">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter First Name"
              onChange={changeHandler}
              value={formData.firstName}
              name="firstName"
              className={inputClass("firstName")}
            />
            <ErrorMsg field="firstName" />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              placeholder="Enter Last Name"
              onChange={changeHandler}
              value={formData.lastName}
              name="lastName"
              className={inputClass("lastName")}
            />
            <ErrorMsg field="lastName" />
          </label>
        </div>

        {/* Email */}
        <label className="w-full mt-4 block">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={changeHandler}
            name="email"
            className={inputClass("email")}
          />
          <ErrorMsg field="email" />
        </label>

        {/* Passwords */}
        <div className="flex gap-x-4 mt-4">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showCreatePass ? "text" : "password"}
              placeholder="Enter Password"
              onChange={changeHandler}
              value={formData.password}
              name="password"
              className={inputClass("password")}
            />
            <span
              onClick={() => setShowCreatePass(!showCreatePass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showCreatePass
                ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
            </span>
            <ErrorMsg field="password" />
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={changeHandler}
              value={formData.confirmpassword}
              name="confirmpassword"
              className={inputClass("confirmpassword")}
            />
            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-[38px] cursor-pointer z-10"
            >
              {showConfirmPass
                ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
            </span>
            <ErrorMsg field="confirmpassword" />
          </label>
        </div>

        <button
          type="submit"
          className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
