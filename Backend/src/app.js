import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/authRoutes.js';
import cors from 'cors'


dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // frontend URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', userRouter);



export default app;