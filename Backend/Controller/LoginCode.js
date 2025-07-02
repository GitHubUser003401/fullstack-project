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
        const token = jwt.sign({ id: user._id, email: user.email, username: user.username, role:user.Role }, process.env.SECRET_KEY, {
            expiresIn: "2h"
        })
        
        const userObj = user.toObject();
        delete userObj.password;
        userObj.token = token;

        res.status(200).json({ message: "Login successful", user: userObj });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");

    }

};