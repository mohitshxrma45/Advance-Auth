import React, { useRef, useState } from 'react';
import { verifyOtp, verifyResetOtp } from "../services/authApi";
import { motion } from 'framer-motion';
import { data, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOtp = () => {

  const navigate = useNavigate()

  const location = useLocation();
  const email = location.state?.email;
  const purpose = location.state?.purpose;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // 6 individual inputs ke liye references taaki typing par automatic focus jump kare
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (index, e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };



  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const otpCode = otp.join("");

      if (purpose === "verify-email") {

        await verifyOtp({
          email,
          otp: otpCode
        });

        toast.success(data.message)
        navigate("/profile");

      } else if (purpose === "reset-password") {

        await verifyResetOtp({
          email,
          otp: otpCode
        });

        toast.success("OTP verified successfully");

        navigate("/reset-password", {
          state: { email }
        });
      }
      setOtp("")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP"
      );
    }
  };


  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between bg-zinc-950 bg-cover bg-center bg-no-repeat px-4 py-12 font-sans"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000')`
      }}
    >
      {/* Top spacing element */}
      <div className="w-full" />

      {/* Main Content Box */}
      <div className="w-full max-w-md flex flex-col items-center gap-10 my-auto">

        {/* Title and Subtitle */}
        <div className="text-center space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold tracking-widest text-white uppercase"
          >
            VERIFY OTP
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-400 max-w-xs mx-auto tracking-wide leading-relaxed"
          >
            Enter the 6-digit verification token sent to your email.
          </motion.p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">

          {/* OTP Digit Inputs (6 Boxes) */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
              >
                <input
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/40 focus:bg-zinc-900/50 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors duration-300 text-base tracking-wide shadow-xl"
            >
              Verify Token
            </motion.button>
          </motion.div>

        </form>
      </div>

    </div>
  );
};

export default VerifyOtp;