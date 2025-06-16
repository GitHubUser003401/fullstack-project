const express = require('express');
const app = express();
const { DBconnection } = require("./database/db");
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
import cors from 'cors';

DBconnection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello, World!, from the backend!");
});
app.get("/anything", (req, res) => {
    res.send("This is anything!");
});

app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password, Phone_Number} = req.body;
        
        //Validation part
        if (!(firstname && lastname && email && password && Phone_Number)) {
            return res.status(400).send("Please enter all the information")
        }
        // Add Validation part
        if (password.length < 6) {
            return res.status(400).send("Password should have more than 6 characters");
        }
        
        const existingUser = await User.findOne({email: email.toLowerCase()})
        if ( existingUser ){
            return res.status(400).send("User already exists with the same email. Please try with a different email.");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: hashedPassword,
            Phone_Number,
        });
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "2h"
        });
        user.token = token;
        user.password = undefined;

        res.status(200).json({ message: "User registered successfully", user });

    } catch (error) {
        console.log(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}!`);
});
