import mongoose from "mongoose"



const otpSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    otp:{
        type:String,
        required:true
    },

    otpExpiry:{
        type:Date,
        required:true
    }

},{
    timestamps:true
})

const otpModel = mongoose.model("otp", otpSchema);
export default otpModel;
