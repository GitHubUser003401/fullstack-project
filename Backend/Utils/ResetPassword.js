import bcrypt from 'bcryptjs';
import User from "../Models/User.js";

export const CreatePassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password } = req.body;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send("Invalid or expired verification link.");
        }
        if (!password || password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters long.");
        }
        if (password.length > 32) {
            return res.status(400).send("Password should have less than 32 characters");
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update the user's password and clear the verification token
        user.password = hashedPassword;
        user.verificationToken = undefined;
        await user.save();
        res.send("Password has been successfully updated. You can now log in with your new password.");
    } catch (error) {
        console.error('Error creating password:', error);
        res.status(500).send("An error occurred while creating the password.");

    }

}