import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Calendar, Hash, LogOut } from 'lucide-react'; // Imported LogOut icon
import { AuthContext } from '../context/AuthContext';
import { loginUser, logoutUser } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  // Destructured logout from your AuthContext
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate()
  const userData = user;


  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successfully")
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server Error"
      );
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans flex flex-col justify-between overflow-hidden">

      {/* Top Header Section */}
      <div className="w-full px-6 pt-12 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold tracking-tight text-zinc-200">Profile</h1>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Main Profile Dashboard Body */}
      <div className="w-full max-w-md mx-auto px-6 flex flex-col items-center flex-1 justify-center gap-8">

        {/* Avatar & Verification Indicator */}
        <div className="relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl relative"
          >
            <User size={44} className="text-zinc-400" strokeWidth={1.5} />

            {/* Conditional Blue Tick Mapping based on user.isVerified */}
            {userData?.isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1.5 border-4 border-black flex items-center justify-center shadow-lg"
              >
                <ShieldCheck size={16} strokeWidth={2.5} fill="currentColor" className="text-blue-500" />
              </motion.div>
            )}
          </motion.div>

          {/* User Display Identifiers */}
          <div className="text-center mt-4 space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-2xl font-bold tracking-tight text-white">{userData?.name}</h2>
              {userData?.isVerified && (
                <ShieldCheck size={18} className="text-blue-500 fill-blue-500/20" strokeWidth={2} />
              )}
            </div>
            <p className="text-sm text-zinc-500 tracking-wide">{userData?.email}</p>
          </div>
        </div>

        {/* Pure User Details Card (Only data elements provided by you) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full bg-zinc-950 border border-zinc-900/80 rounded-3xl p-6 shadow-xl space-y-5"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-600 mb-2">Account Parameters</h3>

          {/* User ID Section */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-3 text-zinc-400">
              <Hash size={16} className="text-zinc-500" />
              <span className="text-sm font-medium">Node ID</span>
            </div>
            <span className="text-sm font-mono text-zinc-300 font-semibold">{userData?.id}</span>
          </div>

          {/* Security Node Status */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-3 text-zinc-400">
              <ShieldCheck size={16} className="text-zinc-500" />
              <span className="text-sm font-medium">Status</span>
            </div>
            <span className={`text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${userData?.isVerified ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
              {userData?.isVerified ? 'Verified' : 'Pending'}
            </span>
          </div>

          {/* Creation Timestamp */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3 text-zinc-400">
              <Calendar size={16} className="text-zinc-500" />
              <span className="text-sm font-medium">Created At</span>
            </div>
            <span className="text-sm text-zinc-300 font-medium">{userData?.createdAt}</span>
          </div>

        </motion.div>
      </div>

      {/* Bottom Navigation Area - Profile and Logout */}
      <div className="w-full bg-zinc-950/40 backdrop-blur-md border-t border-zinc-900/60 py-4 flex justify-around items-center z-10">

        {/* Profile Tab */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-1 text-blue-500 cursor-pointer"
        >
          <div className="p-2 bg-blue-500/10 rounded-full border border-blue-500/20">
            <User size={20} strokeWidth={2} />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Profile</span>
        </motion.div>

        {/* Logout Tab */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
        >
          <div className="p-2 bg-zinc-900 rounded-full border border-zinc-800 evaluation-logout-btn hover:bg-red-500/10 hover:border-red-500/20 transition-colors duration-200">
            <LogOut size={20} strokeWidth={2} />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase">Logout</span>
        </motion.div>

      </div>

    </div>
  );
};

export default Profile;