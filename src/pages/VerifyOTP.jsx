import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import signup from "../services/operation/authapi";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentSignupData = useSelector((state) => state.auth.signupData);
  console.log("Current Signup Data:", currentSignupData);

  // Auto-focus first box
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Simple resend countdown
  useEffect(() => {
    if (resendTimer === 0) return;
    const id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    setError("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!data) return;

    const next = new Array(6).fill("");
    for (let i = 0; i < data.length; i++) {
      next[i] = data[i];
    }
    setOtp(next);

    const lastIndex = Math.min(data.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    if (!currentSignupData) {
      setError("Signup session expired. Please sign up again.");
      navigate("/signup");
      return;
    }

    setLoading(true);

    const updatedSignupData = { ...currentSignupData, otp: otpCode };
    console.log("Final Signup Data:", updatedSignupData);

    const response = await dispatch(signup(updatedSignupData));
    setLoading(false);

    if (response?.success) {
      navigate("/login");
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  const handleResend = () => {
    // TODO: hit resend OTP API here
    setResendTimer(30);
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-richblack-800 px-4 text-white">
    <div className="w-full max-w-md rounded-2xl border border-yellow-500/40 bg-richblack-800 shadow-2xl shadow-yellow-500/30 backdrop-blur-md">
      {/* Header */}
      <div className="border-b border-yellow-500/30 px-8 py-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-yellow-400">
          Security check
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white">
          Verify your account
        </h3>
        <p className="mt-2 text-sm text-zinc-400">
          Enter the 6‑digit code sent to your email address.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 px-8 py-6">
        <div className="flex flex-col items-center gap-3">
          <label
            htmlFor="otp-0"
            className="text-xs font-medium uppercase tracking-[0.20em] text-zinc-400"
          >
            One‑time passcode
          </label>

          <div
            className="flex justify-center gap-2 text-black"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength="1"
                className={
                  "h-12 w-12 rounded-xl border bg-black text-center text-xl font-semibold text-yellow-300 " +
                  "border-zinc-800 shadow-sm shadow-black outline-none transition-all " +
                  "focus:-translate-y-0.5 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/50 " +
                  "disabled:cursor-not-allowed disabled:opacity-60"
                }
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <p className="text-xs text-zinc-500">
            You will be logged out automatically if the code expires.
          </p>
        </div>

        {error && (
          <p className="text-center text-sm font-medium text-red-400">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || otp.join("").length !== 6}
            className="flex w-full items-center justify-center rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-black shadow-lg shadow-yellow-500/40 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify code"}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
            <span>Didn&apos;t get the code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0}
              className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 disabled:cursor-not-allowed disabled:text-zinc-600"
            >
              {resendTimer > 0
                ? `Resend in 0:${resendTimer.toString().padStart(2, "0")}`
                : "Resend code"}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

}
