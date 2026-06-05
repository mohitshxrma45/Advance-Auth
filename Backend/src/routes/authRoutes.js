import express from "express"
import * as authController from "../controllers/authController.js"
import validators from "../validators/auth.validator.js"
import authMiddleware from "../middlewares/authMiddleware.js"


const router = express.Router()

router.post("/register", validators.signupValidation, authController.register)
router.post("/verify-otp", authController.verifyOtp)
router.post("/login", validators.loginValidation, authController.login)
router.post("/refreshToken", authController.refreshToken)
router.get("/profile", authMiddleware, authController.getProfile)
router.post("/logout", authMiddleware, authController.logout)
router.post("/forgot-password", authController.forgotPassword)
router.post("/verify-reset-otp", authController.verifyResetOtp)





export default router;


