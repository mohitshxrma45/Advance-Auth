import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: [
            "https://advance-auth-41rw.vercel.app",
        ],
        credentials: true,
    })
);
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", userRouter);

export default app;