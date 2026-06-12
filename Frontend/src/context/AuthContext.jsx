import React, { createContext, useState } from "react";
import { loginUser, registerUser } from "../services/authApi";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (userData) => {
        const data = await registerUser(userData);
        return data; // no setUser here
    };

    const login = async (userData) => {
        const data = await loginUser(userData);
        setUser(data.user);
        return data;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                register,
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;