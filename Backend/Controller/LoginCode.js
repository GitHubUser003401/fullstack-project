import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginCode = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");

        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).send("User has not registered yet. Please register first.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid Password. Please try again.");
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "24h"
        });
        res.cookie('authToken', token, {
            httpOnly: true,        // Cannot be accessed via JavaScript (XSS protection)
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',    // CSRF protection
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ message: "Login successful", user: userObj });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");

    }
};