import Joi from 'joi'


export const registerSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(8)
        .required()
}).options({
    allowUnknown: false
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
}).options({
    allowUnknown: false
});

export const verifyOtpSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    otp: Joi.string()
        .length(6)
        .required()
}).options({
    allowUnknown: false
});

export const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
}).options({
    allowUnknown: false
});

export const verifyResetOtpSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    otp: Joi.string()
        .length(6)
        .required()
}).options({
    allowUnknown: false
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .required()
}).options({
    allowUnknown: false
});



