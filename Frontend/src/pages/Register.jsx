import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { verifyOtp, verifyResetOtp } from "../services/authApi";


const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { register } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await register({ name, email, password });

      toast.success("OTP sent successfully");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/verify-otp", {
        state: {
          email,
          purpose: "verify-email"
        }
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      )
    }

  };


  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between bg-zinc-950 bg-cover bg-center bg-no-repeat px-6 py-12 font-sans"
      style={{
        // Bhai, background match karne ke liye same imagery use ki hai, locally public folder se swap kar sakte ho
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000')`
      }}
    >
      {/* Top spacing to maintain balance */}
      <div className="w-full" />

      {/* Main Content Box */}
      <div className="w-full max-w-sm flex flex-col items-center gap-12 my-auto">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold tracking-widest text-white uppercase text-center"
        >
          SIGN UP
        </motion.h1>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Full Name Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              type="text"
              placeholder="Full Name"
              className="w-full text-center py-4 bg-zinc-900/30 backdrop-blur-md 
              border border-white/10 rounded-full text-white placeholder-zinc-400 
              focus:outline-none focus:border-white/30 focus:bg-zinc-900/40 transition-all duration-300 text-base"
              required
            />
          </motion.div>

          {/* Email Address Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              placeholder="Email Address"
              className="w-full text-center py-4 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 focus:bg-zinc-900/40 transition-all duration-300 text-base"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              placeholder="Password"
              className="w-full text-center py-4 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 focus:bg-zinc-900/40 transition-all duration-300 text-base"
              required
            />
          </motion.div>

          {/* Sign Up CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors duration-300 text-base tracking-wide shadow-xl"
            >
              Register
            </motion.button>
          </motion.div>

        </form>
      </div>

      {/* Footer Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-sm flex flex-col items-center gap-4 text-center mt-auto"
      >
        <p className="text-sm text-zinc-400 tracking-wide">
          Already have an account?{' '}
          <a href="/" className="text-white font-semibold hover:underline transition-all">
            Sign in
          </a>
        </p>
      </motion.div>

    </div>
  );
};

export default Register;