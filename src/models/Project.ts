
import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    status: { type: String, default: "OPEN" }, // OPEN, IN_PROGRESS, COMPLETED
    requiredSkills: { type: String }, // Comma separated or JSON
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Virtual for populating owner details if needed
ProjectSchema.virtual('owner', {
    ref: 'User',
    localField: 'ownerId',
    foreignField: '_id',
    justOne: true
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
