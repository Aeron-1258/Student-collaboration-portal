
import mongoose, { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
    content: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Message = models.Message || model('Message', MessageSchema);

export default Message;
