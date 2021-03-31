import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
    message: { type: String,   required: true  },
    receiver: { type: mongoose.Schema.ObjectId, ref: 'User' },
}, { timestamps: true });

export const Message = mongoose.model('messages', messageSchema);

