import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginHandler } from "../services/operation/authapi";

const LoginForm = ({ setIsLoggedIn }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email address is required";
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 8) return "Password must be at least 8 characters";
        return "";
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error on change
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        setErrors({ email: emailError, password: passwordError });
        return !emailError && !passwordError;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fix the errors before submitting");
            return;
        }
        try {
            await dispatch(LoginHandler(formData, navigate));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
            {/* Email */}
            <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    type="email"
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={changeHandler}
                    name="email"
                    className={`bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 border ${
                        errors.email ? "border-pink-200" : "border-transparent"
                    }`}
                />
                {errors.email && (
                    <p className="text-pink-200 text-xs mt-1">{errors.email}</p>
                )}
            </label>

            {/* Password */}
            <label className="w-full relative">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    name="password"
                    className={`bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5 border ${
                        errors.password ? "border-pink-200" : "border-transparent"
                    }`}
                />
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer"
                >
                    {showPassword
                        ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        : <AiOutlineEye fontSize={24} fill="#AFB2BF" />}
                </span>
                {errors.password && (
                    <p className="text-pink-200 text-xs mt-1">{errors.password}</p>
                )}
                <Link to="#">
                    <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button
                type="submit"
                className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;
