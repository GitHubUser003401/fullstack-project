import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminUser from '../Models/admin.js';
dotenv.config();

const DEFAULT_ADMINS = process.env.DEFAULT_ADMINS ? process.env.DEFAULT_ADMINS.split(',').map(e => e.trim().toLowerCase()) : [];

const SYSTEM_USER_ID = new mongoose.Types.ObjectId("000000000000000000000000");

export const DefaultAdmins = async () => {
    for (const email of DEFAULT_ADMINS) {
        const exists = await AdminUser.findOne({ email: email.toLowerCase() });
        if (!exists) {
            await AdminUser.create({ email: email.toLowerCase(), addedBy: SYSTEM_USER_ID });
            console.log(`Default admin added: ${email}`);
        } else {
            console.log(`Admin already exists: ${email}`);
        }
    }
}