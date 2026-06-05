import nodemailer from "nodemailer";




export const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "OTP for Email Verification",
            text: `Your OTP is ${otp}`
        });

        return true;
    } catch (err) {
        console.log("Email Error:", err);
        return false;
    }
};