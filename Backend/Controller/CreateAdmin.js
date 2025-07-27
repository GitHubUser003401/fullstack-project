import mongoose from 'mongoose';
import AdminUser from '../Models/admin.js';


function isAllowedEmailDomain(email) {
    const allowedDomains = ['gmail.com', 'yahoo.com', 'rediffmail.com'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false; // Invalid email format
    }
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
}

export const CreateAdminCode = async (req, res) => {
    try {
        const { email } = req.body;
        if (!(email.trim())) {
            return res.status(400).send("Email is required.");
        }
        if (!isAllowedEmailDomain(email)) {
            return res.status(400).send("Email domain is not allowed. Please use gmail.com, yahoo.com, or rediffmail.com");
        }
        const UserId = req.user._id; // Assuming req.user is populated by protectRoute middleware

        const uid = new mongoose.Types.ObjectId(UserId);

        const existingAdmin = await AdminUser.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return res.status(400).send("Admin with this email already exists.");
        }
        const newAdmin = await AdminUser.create({ email: email.toLowerCase(), addedBy: uid });

        res.status(201).json({
            message: "Admin added successfully",
            admin: newAdmin,
        })
    } catch (error) {
        console.error("Error creating admin:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).send("Invalid email format.");
        }
        res.status(500).send("Internal Server Error");
    }
}
