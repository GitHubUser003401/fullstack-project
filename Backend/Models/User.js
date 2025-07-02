import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        required: true,
        match: /^[A-Za-z]+$/,
    },
    lastname: {
        type: String,
        default: null,
        required: true,
        match: /^[A-Za-z]+$/,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Phone_Number: {
        type: String,
        required: true,
        match: /^\d{10}$/,
    },
    Age: {
        type: Number,
        required: true,
        min: 12,
        max: 100,
        validate: {
            validator: Number.isInteger,
            message: "Age must be an integer",
        },
    },
    Role: {
        type: String,
        required: true,
        enum: ["Admin", "Student"],
    },
});

const User = mongoose.model("user", userSchema);
export default User;