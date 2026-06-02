import userModel from "../models/user.model.js"
import { generateOTP } from "../utils/generateOtp.js";
import { hashPassword } from "../utils/hashPassword.js";
import otpModel from "../models/otp.model.js";
import { sendEmail } from "../services/email.service.js";

export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already registered"
            })
        }

        const sendOtp = generateOTP();

        const hashedPassword = await hashPassword(password);

        // Check if an OTP already exists for the email and delete it
        const existingOtp = await otpModel.findOne({ email });
        if (existingOtp) {
            await otpModel.deleteOne({ email });
        }

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);


        const isEmailSend = await sendEmail(email, sendOtp)



        if (!isEmailSend) {
            return res.status(500).json({
                message: "Failed to send OTP email"
            });
        }

        await otpModel.create({
            name,
            email,
            password: hashedPassword,
            otp: sendOtp,
            otpExpiry
        });
        return res.status(200).json({
            message: "OTP sent to email"
        })


    } catch (err) {
        console.log(err)
    }
}




















