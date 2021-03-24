import mongoose from 'mongoose';

const TermSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    description: String,
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Term = mongoose.model('terms', TermSchema);
