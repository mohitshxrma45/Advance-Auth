import express from 'express'
import jwt from 'jsonwebtoken'
import cookies from 'cookie-parser'


const authMiddleware = async (req, res, next) => {

    try {
        const cookieToken = req.cookies?.accessToken;

        const authHeader = req.headers.authorization;

        const headerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({ message: "Access Token not found" })
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = {
            userId: decoded.userId
        };

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired Token" })
    }

}

export default authMiddleware;