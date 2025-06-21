import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
export const registerCode = async (req, res) => {
    try {
        const { firstname, lastname, email, password, Phone_Number, Age, Role} = req.body;
        let username = `${firstname} ${lastname}`;
        //Validation part
        if (!(firstname && lastname && email && password && Phone_Number)) {
            return res.status(400).send("Please enter all the information")
        }
        // Add Validation part
        if (Age < 12 || Age > 100) {
            return res.status(400).send("Age should be between 12 and 100");
        }
        if (password.length < 6) {
            return res.status(400).send("Password should have more than 6 characters");
        }
        const existingUser = await User.findOne({email: email.toLowerCase()})
        if ( existingUser ){
            return res.status(400).send("User already exists with the same email. Please try with a different email.");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
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
        });
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "2h"
        });
        user.token = token;
        user.password = undefined;

        res.status(200).json({ message: "User registered successfully", user });

    
} catch (err) {
    if (err.name === 'ValidationError'){
        if(err.errors && err.errors.firstname){
            return res.status(400).send("Firstname is invalid it should only contain Alphabets.")
        }
        if(err.errors && err.errors.lastname){
            return res.status(400).send("Lastname is invalid it should only contain Alphabets.")
        }
        if(err.errors && err.errors.Phone_Number){
            return res.status(400).send("Phone Number is invalid it should only contain 10 digits.")
        }
        if(err.errors && err.errors.Age){
            return res.status(400).send("Age is invalid it should only contain numbers.")
        }

    }
    return res.status(400).send("Error in registering user: " + err.message);
}
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
