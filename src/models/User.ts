
import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    image: { type: String },
    bio: { type: String },
    skills: { type: String }, // Comma separated or JSON string
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = models.User || model('User', UserSchema);

export default User;
