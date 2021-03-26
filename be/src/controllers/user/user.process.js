import md5 from 'md5';
import ejs from 'ejs';

import { Faculty } from '../../models/faculty.model.js';
import { User } from '../../models/user.model.js';

import { accessToken } from '../../utils/index.js';
import { sanitizeUpdateData, sanitizeUserData } from './user.validator.js';

import { AWS_FOLDER, E_TUTOR_BUCKET } from '../../common/enum.js';
import { uploadAWS } from '../../common/aws.js';
import { mailer } from '../../common/mailer.js';

export const loginAuthentication = async ({ email, password }) => {
    const response = {
        statusCode: 200,
        message: 'Login successful',
        data: {},
    };

    try {
        const user = await User.findOne({ email }).populate({ path: 'profile.faculty' });
        if (!user || !user.comparePassword(password)) {
            return {
                statusCode: 401,
                message: 'Wrong email or password',
                data: {},
            };
        }

        response.data = {
            user: sanitizeUserData(user),
            accessToken: accessToken(user._id),
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const getUserService = async (id) => {
    const response = {
        statusCode: 200,
        message: 'User detail get successful',
        data: {},
    };

    try {
        const user = await User.findById(id);
        response.data = user;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const listUserService = async (filter = {}, limit, skip, currentUser) => {
    const response = {
        statusCode: 200,
        message: 'Listing users successful',
        data: {},
    };

    try {
        const filterUserList = {
            ...filter,
            isDeleted: false,
            _id: {
                $ne: currentUser._id
            }
        };

        const total = await User.countDocuments(filterUserList);
        const users = await User.find(filterUserList)
            .limit(limit)
            .skip(skip);

        response.data = {
            total,
            limit,
            skip,
            totalPage: Math.ceil(total / limit),
            data: users,
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createUserService = async (data) => {
    const response = {
        statusCode: 200,
        message: 'Create new user successful',
        data: {},
    };

    try {
        const user = await User.findOne({ email: data.email });
        if (user) {
            return {
                statusCode: 400,
                message: 'User existed',
                data: { user },
            };
        }

        const createdData = {
            email: data.email,
            password: data.password,
            profile: {
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                role: data.profile.role,
                city: data.profile.city,
                address: data.profile.address,
                phone: data.profile.phone,
            },
        };

        let faculty;
        // if is not admin, require faculty
        if (data.profile.role !== 'admin') {
            if (!data.profile.faculty) {
                return {
                    statusCode: 400,
                    message: 'faculty is required',
                    data: {},
                };
            }

            faculty = await Faculty.findById(data.profile.faculty);
            if (!faculty) {
                return {
                    statusCode: 404,
                    message: 'faculty not existed',
                    data: {},
                };
            }
            createdData.profile.faculty = data.profile.faculty;
        }

        const newUser = new User(createdData);

        const body = await ejs.renderFile('src/views/new-user.template.ejs', {
            first_name: data.profile.firstName,
            email: data.email,
            password: data.password,
            firstName: data.profile.firstName,
            lastName: data.profile.lastName,
            role: data.profile.role,
            address: data.profile.address,
            city: data.profile.city,
            phone: data.profile.phone,
            button_link: process.env.FE_END_POINT,
            faculty: data.profile.role !== 'admin' && faculty.name
        });

        await mailer({
            email: data.email,
            subject: 'Invitation to the Magazine system',
            content: body,
        });

        response.data = await newUser.save();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const updateUserService = async ({ userId, data }) => {
    const response = {
        statusCode: 200,
        message: 'Update user successful',
        data: {},
    };

    try {
        const updateData = sanitizeUpdateData(data);
        const user = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        if (data.password) {
            user.password = data.password;
            await user.save();
        }

        response.data = sanitizeUserData(user);
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const deleteUserService = async ({ userId }) => {
    const response = {
        statusCode: 200,
        message: 'Delete user successful',
        data: {},
    };

    try {
        const user = await User.findOneAndUpdate({ _id: userId }, {
            email: `DELETED_USER_${md5(Date.now())}`,
            profile: {
                firstName: 'DELETED',
                lastName: 'DELETED',
                avatar: 'default_avatar.jpg',
                city: '',
                address: '',
                phone: '',
            },
            isDeleted: true,
        }, { new: true });
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        response.data = user;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const uploadUserAvatar = async ({ userId, avatar }) => {
    const response = {
        statusCode: 200,
        message: 'Upload avatar successful',
        data: {},
    };

    try {
        const user = await User.findOne({ _id: userId }).select('email profile createdAt');
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found',
                data: {},
            };
        }

        // avatarPath: first-lastName.hash(date).mimetype
        user.profile.avatar = `${user.profile.firstName}-${user.profile.lastName}.${md5(Date.now())}.${avatar.originalname.split('.').pop()}`;
        await uploadAWS(E_TUTOR_BUCKET, `${AWS_FOLDER.IMAGE}${user.profile.avatar}`, avatar.buffer);

        response.data = await user.save();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};
