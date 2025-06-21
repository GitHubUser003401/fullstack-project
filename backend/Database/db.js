import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBconnection = async () => {
    const MONGO_URI = process.env.MONGODB_URL;
    try {
        await mongoose.connect(MONGO_URI); 
        console.log("DB connection Established!");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
};

export default DBconnection;
