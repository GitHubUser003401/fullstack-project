import User from "../Models/User.js";

export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
        return res.status(400).send("Invalid or expired verification link.");
    }
    
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.send("Email verified successfully! You can now log in.");
};