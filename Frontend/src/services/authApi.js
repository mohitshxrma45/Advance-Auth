import axiosInstance from "../utils/axiosInstance";

// Register
export const registerUser = async (userData) => {
    const response = await axiosInstance.post("/register", userData);
    return response.data;
};

// Verify OTP
export const verifyOtp = async (otpData) => {
    const response = await axiosInstance.post("/verify-otp", otpData);
    return response.data;
};

// Login
export const loginUser = async (loginData) => {
    const response = await axiosInstance.post("/login", loginData);
    return response.data;
};

// Refresh Token
export const refreshToken = async () => {
    const response = await axiosInstance.post("/refresh-token");
    return response.data;
};

// Profile
export const getProfile = async () => {
    const response = await axiosInstance.get("/profile");
    return response.data;
};

// Logout
export const logoutUser = async () => {
    const response = await axiosInstance.post("/logout");
    return response.data;
};

// Forgot Password
export const forgotPassword = async (emailData) => {
    const response = await axiosInstance.post(
        "/forgot-password",
        emailData
    );
    return response.data;
};

// Verify Reset OTP
export const verifyResetOtp = async (otpData) => {
    const response = await axiosInstance.post(
        "/verify-reset-otp",
        otpData
    );
    return response.data;
};

// Reset Password
export const resetPassword = async (passwordData) => {
    const response = await axiosInstance.post(
        "/reset-password",
        passwordData
    );
    return response.data;
};