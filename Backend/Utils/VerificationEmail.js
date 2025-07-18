import User from "../Models/User.js";

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send("Invalid or expired verification link.");
        }

        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.send("Email verified successfully! You can now log in.");
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).send("An error occurred while verifying the email.");
    }

};