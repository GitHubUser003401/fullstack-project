import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import crypto from 'crypto';
import User from '../Models/User.js';
import dotenv from 'dotenv';
dotenv.config();

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

export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }
        if (!user.verified) {
            return res.status(400).json({ message: 'Please verify your email before resetting the password.' });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const timePart = Date.now().toString(36)
        const verificationToken = `${resetToken}.${timePart}`;
        user.verificationToken = verificationToken;
        await user.save();
        const verificationLink = `${process.env.CLIENT_URL}/forgot?token=${verificationToken}`;
        try {
            const transporter = await createTransporter();
            const mailOptions = {
                from: `"DevForge" <${process.env.GMAIL_USER}>`, // Sender address`
                to: email.toLowerCase(), // List of recipients
                subject: 'DevForge- Change Password', // Subject line
                html: `<div style="font-family: Times New Roman, serif; font-size: 16px; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; text-align: center;">
                <h2 style="color: #DC2626;">Change your Password, ${user.firstname}!</h2>
                <p style="color: #555555;">Please click the link below to change the password:</p>
                <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #DC2626; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <hr style="margin: 20px 0; border: 1px solid #DC2626;">
                <p style="color: #666666; font-size: 14px;">
                If you don't want to change the password for this account, please ignore this email.
                </p>
                </div>
                `
            };
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Password reset link sent to your email' });
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
}
