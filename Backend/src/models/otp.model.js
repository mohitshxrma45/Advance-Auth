import mongoose from "mongoose"



const otpSchema = new mongoose.Schema({

    name: {
        type: String,

    },

    email: {
        type: String,

    },

    password: {
        type: String,

    },

    otp: {
        type: String,
    },

    otpExpiry: {
        type: Date,

    },
    purpose: {
        type: String,
        default: "register"
    }

}, {
    timestamps: true
})

const otpModel = mongoose.model("otp", otpSchema);
export default otpModel;
