import userModel from "../models/user.model.js"
import { generateOTP } from "../utils/generateOtp.js";
import { hashPassword } from "../utils/hashPassword.js";
import otpModel from "../models/otp.model.js";
import { sendEmail } from "../services/email.service.js";
import { generateAccessToken, generateRefreshToken } from "../services/tokenService.js";
import { comparePassword } from "../utils/comparePassword.js";
import nodemailer from "nodemailer";



export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already registered" });
        }

        const otp = generateOTP().toString();
        const hashedOtp = await hashPassword(otp);
        const hashedPassword = await hashPassword(password);

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const isEmailSend = await sendEmail(email, otp);
        if (!isEmailSend) {
            return res.status(500).json({ message: "Failed to send OTP email" });
        }

        await otpModel.create({
            name,
            email,
            password: hashedPassword,
            otp: hashedOtp,
            otpExpiry
        });

        return res.status(200).json({
            message: "OTP sent to email"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await otpModel.findOne({ email });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        if (otpRecord.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const isMatch = await comparePassword(otpRecord.otp, otp);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid OTP" });
        }


        const user = await userModel.create({
            name: otpRecord.name,
            email: otpRecord.email,
            password: otpRecord.password,
            isVerified: true
        });

        const refreshToken = await generateRefreshToken(user._id);
        const accessToken = await generateAccessToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        await otpModel.deleteOne({ email });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "User verified successfully",
            user: {
                id: user._id,
                email: user.email,
                isVerified: true
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const isUser = await userModel.findOne({ email });

        if (!isUser) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        if (!isUser.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            });
        }

        const isMatch = await comparePassword(isUser.password, password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const refreshToken = await generateRefreshToken(isUser._id);
        const accessToken = await generateAccessToken(isUser._id);

        isUser.refreshToken = refreshToken;
        await isUser.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        })
            .status(200).json({
                success: true,
                message: "Login successfull",
                name: isUser.name,
                id: isUser._id
            })


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const refreshToken = async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Refresh Token not found" })
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.refreshToken !== incomingRefreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" })
        }

        const newAccessToken = await generateAccessToken(user._id);

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        }).status(200).json({
            success: true,
            message: "Access token refreshed successfully",
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "JsonwebToken Error" });
    }
}

export const getProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        const safeUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified,
            createdAt: user.createdAt
        }
        return res.status(200).json({
            message: "Profile fetched successfully",
            user: safeUser

        })



    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }

}

export const logout = async (req, res) => {

    try {

        const user = await userModel.findById(req.user.userId)

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        user.refreshToken = null;
        await user.save();

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENC === "production",
            sameSite: "strict",
        });

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENC === "production",
            sameSite: "strict",
        })

        res.status(200).json({
            message: "User logout successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }



}

export const forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const isUserExist = await userModel.findOne({ email })

        if (!isUserExist) {
            return res.status(404).json({ message: "User is not Registered" })
        }

        const otp = generateOTP();
        const hash = await hashPassword(otp);

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const isEmailSend = await sendEmail(email, otp);

        if (!isEmailSend) {
            return res.status(500).json({ message: "Failed to send OTP Email" })
        }


        await otpModel.deleteMany({
            email,
            purpose: "forgot-password"
        });

        await otpModel.create({
            email,
            otp: hash,
            otpExpiry,
            purpose: "forgot-password"

        })

        return res.status(200).json({
            message: "OTP send to Email"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })

    }
}

export const verifyResetOtp = async (req, res) => {

    try {
        const { email, otp } = req.body;

        const isUser = await otpModel.findOne({
            email,
            purpose: "forgot-password"
        })

        if (!isUser) {
            return res.status(401).json({ message: "User not Found" })
        }

        if (isUser.otpExpiry < Date.now()) {
            return res.status(404).json({ message: "OTP is expired" })

        }

        const compare = await comparePassword(isUser.otp, otp)

        if (!compare) {
            return res.status(404).json({ message: "OTP is not Match" })
        }

        res.status(200).json({
            message: "OTP verified successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Internal server error" })

    }

}