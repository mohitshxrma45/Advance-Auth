import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { forgotPassword } from '../services/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await forgotPassword({ email })
      toast.success(data.message);
      setEmail("");

      navigate("/verify-otp", {
        state: {
          email,
          purpose: "reset-password"
        }
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server Error"
      )

    }



  }
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-between bg-zinc-950 bg-cover bg-center bg-no-repeat px-6 py-12 font-sans"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000')`
      }}
    >
      {/* Top Spacer */}
      <div className="w-full" />

      {/* Main Content Box */}
      <div className="w-full max-w-sm flex flex-col items-center gap-10 my-auto">

        {/* Title and Description */}
        <div className="text-center space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold tracking-widest text-white uppercase"
          >
            RECOVERY
          </motion.h1>
          <p className="text-sm text-zinc-400 max-w-xs mx-auto tracking-wide leading-relaxed">
            Enter your email to request password reset credentials or token verification parameters.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Email Only Input */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="Registered Email"
              className="w-full text-center py-4 bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-white/30 focus:bg-zinc-900/40 transition-all duration-300 text-base"
              required
            />
          </motion.div>

          {/* Action CTA Button */}
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
              Send Request
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
        <a
          href="/"
          className="text-sm text-zinc-400 font-medium hover:text-white transition-colors tracking-wide underline underline-offset-4"
        >
          Return to login
        </a>
      </motion.div>

    </div>
  );
};

export default ForgotPassword;