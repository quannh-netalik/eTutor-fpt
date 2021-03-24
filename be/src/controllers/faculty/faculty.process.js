import { Faculty } from '../../models/faculty.model.js';
import { User } from '../../models/user.model.js';

export const getFacultyService = async (id) => {
    const response = {
        statusCode: 200,
        message: 'Showing faculty detail',
        data: {}
    };

    try {
        const faculty = await Faculty.findById(id);
        response.data = await Faculty.populate(faculty, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const getListFacultyService = async (filter = {}) => {
    const response = {
        statusCode: 200,
        message: 'Showing list faculty',
        data: {}
    };

    try {
        const faculties = await Faculty.find(filter);
        response.data = await Faculty.populate(faculties, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createFacultyService = async (data, currentUser) => {
    const response = {
        statusCode: 201,
        message: 'Create faculty successful',
        data: {}
    };

    try {
        const faculty = await Faculty.findOne({ name: data.name });
        if (faculty) {
            return {
                statusCode: 400,
                message: 'Faculty existed',
                data: {}
            };
        }

        const newFaculty = await Faculty.create({
            name: data.name,
            createdBy: currentUser._id,
        });

        response.data = await Faculty.populate(newFaculty, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const updateFacultyService = async ({ facultyId, data }) => {
    const response = {
        statusCode: 200,
        message: 'Update faculty successful',
        data: {}
    };

    try {
        const faculty = await Faculty.findOne({ _id: facultyId });
        if (!faculty) {
            return {
                statusCode: 404,
                message: 'Faculty not existed',
                data: {}
            };
        }

        if (data.name) {
            const checkFaculty = await Faculty.findOne({
                _id: { $ne: faculty._id },
                name: data.name,
            });

            if (checkFaculty) {
                return {
                    statusCode: 400,
                    message: 'Faculty name existed',
                    data: {}
                };
            }
        }

        const newFaculty = await Faculty.findOneAndUpdate({ _id: facultyId }, data, { new: true });

        response.data = await Faculty.populate(newFaculty, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const deleteFacultyService = async ({ facultyId }) => {
    const response = {
        statusCode: 200,
        message: 'Delete faculty successful',
        data: {}
    };

    try {
        // check whether user in faculty or not
        const userInFaculty = await User.findOne({
            'profile.faculty': facultyId
        });
        // return err if found user
        if (userInFaculty) {
            return {
                statusCode: 400,
                message: 'Still have user in faculty',
                data: {
                    _id: userInFaculty._id,
                    email: userInFaculty.email,
                    profile: userInFaculty.profile,
                },
            };
        }

        const faculty = await Faculty.findOneAndDelete({ _id: facultyId });
        if (!faculty) {
            return {
                statusCode: 404,
                message: 'Faculty not existed',
                data: {}
            };
        }

        response.data = await Faculty.populate(faculty, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};
