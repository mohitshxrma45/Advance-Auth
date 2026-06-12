# Advanced Authentication System

A full-stack authentication system built with the MERN stack, featuring secure user registration, email verification, login, JWT authentication, password reset via OTP, protected routes, and token-based session management.

## Features

### Authentication

* User Registration
* Email OTP Verification
* User Login
* Secure Logout
* Protected Profile Route

### Security

* JWT Access Token Authentication
* Refresh Token Mechanism
* HTTP-Only Cookies
* Password Hashing with bcrypt
* Token Expiration Handling
* Secure Password Reset Flow

### Password Recovery

* Forgot Password
* OTP Verification via Email
* Reset Password using Temporary Reset Token
* Automatic Reset Token Cleanup

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Framer Motion
* React Toastify
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer
* Cookie Parser

## Project Structure

Frontend
├── Components
├── Context
├── Pages
├── Services
└── Routes

Backend
├── Controllers
├── Models
├── Routes
├── Validators
├── Middleware
├── Services
└── Utils

## Authentication Flow

### Registration

User Register
→ OTP Sent to Email
→ Verify OTP
→ Account Created
→ Login Session Started

### Login

User Login
→ Access Token Generated
→ Refresh Token Generated
→ Tokens Stored in HTTP-Only Cookies
→ Access Protected Routes

### Password Reset

Forgot Password
→ OTP Sent to Email
→ Verify OTP
→ Reset Token Created
→ Reset Password
→ Reset Token Removed

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/verify-otp

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/profile

POST /api/auth/refreshToken

### Password Recovery

POST /api/auth/forgot-password

POST /api/auth/verify-reset-otp

POST /api/auth/reset-password

## Environment Variables

Create a .env file in the backend directory.

PORT=3000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

RESET_SECRET=your_reset_secret

EMAIL_USER=your_email

EMAIL_PASS=your_email_password

NODE_ENV=development

## Installation

### Clone Repository

git clone https://github.com/mohitshxrma45/Advance-Auth.git

cd advanced-auth-system

### Backend Setup

cd Backend

npm install

npx nodemon server.js

### Frontend Setup

cd Frontend

npm install

npm run dev

## Security Practices

* Passwords are hashed before storage.
* JWT authentication is used for authorization.
* HTTP-only cookies prevent token access from JavaScript.
* Refresh token rotation support.
* OTP expiration mechanism.
* Reset password token expiration.
* Protected API routes using middleware.

## Future Improvements

* Resend OTP Functionality
* Rate Limiting
* Google OAuth Authentication
* GitHub OAuth Authentication
* Role-Based Access Control
* Account Lockout after Multiple Failed Attempts
* Two-Factor Authentication (2FA)

## Author

Mohit Sharma

B.Tech Computer Science Engineering

MERN Stack Developer

Java & Full Stack Enthusiast
