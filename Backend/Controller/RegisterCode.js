import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import crypto from 'crypto';
import dotenv from 'dotenv';
import AdminUser from '../Models/admin.js';
dotenv.config();



function isAllowedEmailDomain(email) {
    const allowedDomains = ['gmail.com', 'yahoo.com', 'rediffmail.com'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false; // Invalid email format
    }
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID, // Client ID from Google Cloud Console
    process.env.GOOGLE_CLIENT_SECRET, // Client Secret from Google Cloud Console
    'https://developers.google.com/oauthplayground' // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN // Refresh token from OAuth2 Playground
});

const createTransporter = async () => {
    try {
        const accessToken = await oauth2Client.getAccessToken();
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GMAIL_USER, // Your Gmail address
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });
    } catch (error) {
        console.error('Error creating transporter:', error);
        throw error;
    }
}

//Registration
export const registerCode = async (req, res) => {
    try {
        const { firstname, lastname, email, password, Phone_Number, Age, Role } = req.body;
        let username = `${firstname} ${lastname}`;
        //Validation part
        if (!(firstname.trim() && email && password && Phone_Number && Age && Role)) {
            return res.status(400).send("Please enter all the information")
        }
        if (!isAllowedEmailDomain(email)) {
            return res.status(400).send("Email domain is not allowed. Please use gmail.com, yahoo.com, or rediffmail.com");
        }

        // Add Validation part
        if (Age < 12 || Age > 100) {
            return res.status(400).send("Age should be between 12 and 100");
        }
        if (password.length < 6) {
            return res.status(400).send("Password should have more than 6 characters");
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return res.status(400).send("User already exists with the same email. Please try with a different email.");
        }
        if (Role === "Admin") {
            const admin = await AdminUser.findOne({ email: email.toLowerCase() });
            if (!admin) {
                return res.status(400).send("You are not authorized to register as an Admin. Please contact support.");
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString('hex'); // Generate a random token
        const verificationLink = `${process.env.CLIENT_URL}/verify?token=${verificationToken}`;
        try {
            const transporter = await createTransporter();
            const mailOptions = {
                from: `"DevForge" <${process.env.GMAIL_USER}>`, // Sender address`
                to: email.toLowerCase(), // List of recipients
                subject: 'Welcome to DevForge', // Subject line
                html: `<div style="font-family: Times New Roman, serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; text-align: center;">
                <h2 style="color: #DC2626;">Welcome to DevForge, ${firstname}!</h2>
                <p style="color: #555555;">Thank you for registering with us. We are excited to have you on board!</p>
                <p style="color: #555555;">Thank you for choosing DevForge. We look forward to serving you.</p>
                <p style="color: #555555;">Please click the link below to verify your email address and complete your registration:</p>
                <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <hr style="margin: 20px 0; border: 1px solid #DC2626;">
                <p style="color: #666666; font-size: 14px;">
                If you didn't register for this account, please ignore this email.
                </p>
                </div>
                `
            };

            await transporter.sendMail(mailOptions);

            try {
                const user = await User.create({
                    firstname,
                    lastname,
                    username: username.charAt(0).toUpperCase() + username.slice(1),
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    Phone_Number,
                    Age,
                    Role,
                    verified: false,
                    verificationToken
                });
                const userObj = user.toObject();
                delete userObj.password;

                res.status(200).json({ message: "User registered successfully! Please Verify Email to Log-in.", user: userObj });


            } catch (err) {
                if (err.name === 'ValidationError') {
                    if (err.errors && err.errors.firstname) {
                        return res.status(400).send("Firstname is invalid - Required: True, It should only contain Alphabets.")
                    }
                    if (err.errors && err.errors.lastname) {
                        return res.status(400).send("Lastname is invalid - Required: True, It should only contain Alphabets.")
                    }
                    if (err.errors && err.errors.Phone_Number) {
                        return res.status(400).send("Phone Number is invalid  - Required: True, It should only contain 10 digits.")
                    }
                    if (err.errors && err.errors.Age) {
                        return res.status(400).send("Age is invalid - Required: True, It should be an integer between 12 and 100.")
                    }
                }
                if (err.name === 'CastError') {
                    return res.status(400).send("Invalid data format. Please check your input.");

                }
                return res.status(400).send("Error in registering user: " + err.message);
            }
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            const errorMessage = emailError.message?.toLowerCase() || '';
            const errorCode = emailError.code || '';

            if (errorMessage.includes('invalid_grant') || errorMessage.includes('unauthorized')) {
                console.error('OAuth2.0 authentication failed');
                return res.status(500).send("Email service temporarily unavailable. Please try again later.");

            } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
                console.error('Gmail quota exceeded');
                return res.status(500).send("Email service quota exceeded. Please try again later.");

            } else if (errorCode === 'ENOTFOUND') {
                // This might actually work for completely invalid domains
                return res.status(400).send("Email domain does not exist. Please check your email address.");

            } else if (errorMessage.includes('recipient')) {
                return res.status(400).send("Invalid recipient email address.");

            } else {
                // Most cases - Gmail accepted email but we can't verify if it's real
                console.error('Unknown email error:', emailError);
                return res.status(400).send("Failed to send welcome email. Please verify your email address is correct.");
            }
        }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    };