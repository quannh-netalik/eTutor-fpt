import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    bgImage: { type: String, default: 'default_blog_bgimage.jpg' },
    status: {
        type: String,
        enum: ['pending', 'approve', 'reject'],
        default: 'pending',
    },
    files: [{
        fileName: { type: String, required: true },
        filePath: { type: String, required: true },
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    faculty: {
        type: mongoose.Schema.ObjectId,
        ref: 'faculties',
        required: true,
    },
    term: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'terms',
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

export const Blog = mongoose.model('blogs', BlogSchema);
