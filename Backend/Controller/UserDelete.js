import User from "../Models/User.js";

export const deleteUserCode = async (req, res) => {
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        });
        const id = req.user._id;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        if (error.name === 'CastError') {
            return res.status(400).send("Invalid user ID format");
        }
        res.status(500).send("Internal Server Error");
    }
}