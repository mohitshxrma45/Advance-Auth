import express from "express"
import * as authController from "../controllers/authController.js"
import {
    forgotPasswordSchema,
    loginSchema,
    registerSchema,
    resetPasswordSchema,
    verifyOtpSchema,
    verifyResetOtpSchema
} from "../validators/auth.validator.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import { validate } from "../middlewares/validationMiddleware.js"


const router = express.Router()

router.post("/register", validate(registerSchema), authController.register)
router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp)
router.post("/login", validate(loginSchema), authController.login)
router.post("/refreshToken", authController.refreshToken)
router.get("/profile", authMiddleware, authController.getProfile)
router.post("/logout", authMiddleware, authController.logout)
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword)
router.post("/verify-reset-otp", validate(verifyResetOtpSchema), authController.verifyResetOtp)
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword)





export default router;


