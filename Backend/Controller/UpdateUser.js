import AdminUser from "../Models/admin.js";
import User from "../Models/User.js";

export const UpdateUser = async (req, res) => {
    try {
        const { firstname, lastname, email, Phone_Number, Age, Role } = req.body;
        let username = `${firstname} ${lastname}`;

        if (!(firstname.trim() && Phone_Number && Age && Role)) {
            return res.status(400).send("Please enter all the information")
        }

        // Add Validation part
        if (Age < 12 || Age > 100) {
            return res.status(400).send("Age should be between 12 and 100");
        }

        if (Role === "Admin") {
            const admin = await AdminUser.findOne({ email: email.toLowerCase() });
            if (!admin) {
                return res.status(400).send("You are not authorized to register as an Admin. Please contact support.");
            }
        }
        try {
            const UpdateUser = await User.findByIdAndUpdate(req.user._id, {
                firstname,
                lastname,
                username: username.charAt(0).toUpperCase() + username.slice(1),
                Phone_Number,
                Age,
                Role
            }, {
                new: true,
                runValidators: true  // ✅ This enables schema validation
            });

            if (!UpdateUser) {
                return res.status(404).send("User not found");
            }
            const userObj = UpdateUser.toObject();
            delete userObj.password;

            res.status(200).json({ message: "User updated successfully", user: userObj });
        } catch (err) {
            if (err.name === 'ValidationError') {
                if (err.errors && err.errors.firstname) {
                    return res.status(400).send("Firstname is invalid - Required: True, It should only contain Alphabets.")
                }
                if (err.errors && err.errors.lastname) {
                    return res.status(400).send("Lastname is invalid - Required: True, It should only contain Alphabets.")
                }
                if (err.errors && err.errors.Phone_Number) {
                    return res.status(400).send("Phone Number is invalid  - Required: True, It should only contain 10 digits.")
                }
                if (err.errors && err.errors.Age) {
                    return res.status(400).send("Age is invalid - Required: True, It should be an integer between 12 and 100.")
                }
            }
            if (err.name === 'CastError') {
                return res.status(400).send("Invalid data format. Please check your input.");

            }
            return res.status(400).send("Error in updating user: " + err.message);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}