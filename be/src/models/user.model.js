import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'manager', 'coordinator', 'student', 'guest'],
            default: 'student',
        },
        city: String,
        address: String,
        phone: String,
        avatar: {
            type: String,
            default: 'default_avatar.jpg',
        },
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'faculties' },
    },
}, { timestamps: true });

UserSchema.pre('save', async function save(next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = bcrypt.hashSync(this.password, salt);
        }

        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model('users', UserSchema);
