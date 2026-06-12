import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()




  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login({ email, password });

      toast.success(data.message);

      setEmail("");
      setPassword("");

      navigate("/profile");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      )
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between bg-zinc-950 bg-cover bg-center bg-no-repeat px-6 py-12 font-sans"
      style={{
        // Bhai, apni image public folder me daal kar yahan backdrop change kar lena
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000')`
      }}
    >
      {/* Absolute top spacer to push content naturally */}
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
          SIGN IN
        </motion.h1>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="Email Address"
              className="w-full text-center py-4 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 focus:bg-zinc-900/40 transition-all duration-300 text-base"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="Password"
              className="w-full text-center py-4 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 focus:bg-zinc-900/40 transition-all duration-300 text-base"
              required
            />
          </motion.div>

          {/* Sign In CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-4 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors duration-300 text-base tracking-wide shadow-xl"
            >
              Sign in
            </motion.button>
          </motion.div>

        </form>
      </div>

      {/* Footer Navigation Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-sm flex flex-col items-center gap-4 text-center mt-auto"
      >
        <p className="text-sm text-zinc-400 tracking-wide">
          Don't have an account?{' '}
          <a href="/register" className="text-white font-semibold hover:underline transition-all">
            Sign up
          </a>
        </p>

        <a
          href="/forgot-password"
          className="text-sm text-zinc-400 font-medium hover:text-white transition-colors tracking-wide"
        >
          Forgot Password?
        </a>
      </motion.div>

    </div>
  );
};

export default Login;