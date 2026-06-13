import { Routes, Route } from "react-router-dom";

import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        } />

        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />

        <Route path="/verify-otp" element={
          <GuestRoute>
            <VerifyOtp />
          </GuestRoute>
        } />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="*" element={<div>404 Not Found</div>} />

      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>

  );
}

export default App;