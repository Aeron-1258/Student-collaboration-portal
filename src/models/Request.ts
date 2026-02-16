
import mongoose, { Schema, model, models } from 'mongoose';

const RequestSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, default: "PENDING" }, // PENDING, ACCEPTED, REJECTED
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Compound unique index to prevent duplicate requests
RequestSchema.index({ projectId: 1, userId: 1 }, { unique: true });

const Request = models.Request || model('Request', RequestSchema);

export default Request;
