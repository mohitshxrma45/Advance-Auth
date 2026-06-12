import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user ? <Navigate to="/profile" /> : children;
};

export default GuestRoute;