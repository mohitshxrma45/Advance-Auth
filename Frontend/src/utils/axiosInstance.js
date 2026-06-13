import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://advance-auth-1-i4hf.onrender.com/api/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;