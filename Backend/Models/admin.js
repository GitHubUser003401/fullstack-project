import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const AdminUser = mongoose.model('AdminUser', adminSchema);
export default AdminUser;
