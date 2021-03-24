import md5 from 'md5';
import mongoDb from 'mongodb';

import { Blog } from '../../models/blog.model.js';
import { Comment } from '../../models/comment.model.js';
import { Faculty } from '../../models/faculty.model.js';
import { Term } from '../../models/term.model.js';
import { sanitizeUpdateData } from './blog.validator.js';
import { downloadAWS, uploadAWS } from '../../common/aws.js';
import { AWS_FOLDER, E_TUTOR_BUCKET } from '../../common/enum.js';
import { zipFile } from '../../utils/index.js';
export const getBlogService = async (blogId) => {
    const response = {
        statusCode: 200,
        message: 'Showing blog successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({
            _id: blogId,
            isDeleted: false,
        })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: '_id name' })
            .populate({ path: 'term', select: '_id name description startDate endDate' })
            .lean();
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        const comments = await Comment.find({ blog: blog._id })
            .sort({ updatedAt: -1 })
            .populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' })
            .select('content user')
            .limit(10)
            .lean();

        response.data = {
            ...blog,
            comments
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const listBlogService = async (filter = {}, limit, skip) => {
    const response = {
        statusCode: 200,
        message: 'Showing list blog successful',
        data: {},
    };

    try {
        const total = await Blog.countDocuments(filter);
        const blogs = await Blog.find({
            ...filter,
            isDeleted: false,
        })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: '_id name' })
            .populate({ path: 'term', select: '_id name description startDate endDate' })
            .sort({ updatedAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();

        const addComment = blogs.map(async (blog) => {
            const comments = await Comment.find({ blog: blog._id })
                .sort({ updatedAt: -1 })
                .populate({ path: 'user', select: 'email profile.firstName profile.lastName profile.avatar' })
                .select('content user')
                .limit(5)
                .lean();

            return {
                ...blog,
                comments
            };
        });

        const mappingComment = await Promise.all(addComment);
        response.data = {
            total,
            limit,
            skip,
            totalPage: Math.ceil(total / limit),
            data: mappingComment,
        };
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createBlogService = async ({ data, user: currentUser }) => {
    const response = {
        statusCode: 200,
        message: 'Create blog successful',
        data: {},
    };

    try {
        // check exist term
        const term = await Term.findOne({
            _id: data.term,
            isActive: true,
        });
        if (!term) {
            return {
                statusCode: 404,
                message: 'Term not found',
                data: {},
            };
        }

        const now = new Date();
        const startDate = new Date(term.startDate);
        const endDate = new Date(term.endDate);

        if (startDate > now || now > endDate) {
            return {
                statusCode: 400,
                message: 'Term out of date',
                data: {},
            };
        }

        // check exist faculty
        const faculty = await Faculty.findOne({
            _id: data.faculty,
            isActive: true,
        });
        if (!faculty) {
            return {
                statusCode: 404,
                message: 'Faculty not found',
                data: {},
            };
        }

        const blog = await Blog.create({
            title: data.title,
            content: data.content,
            createdBy: currentUser._id,
            faculty: data.faculty,
            term: data.term,
        });

        response.data = await blog
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: 'name' })
            .populate({ path: 'term', select: 'name description startDate endDate' })
            .execPopulate();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const updateBlogService = async ({ blogId, data }) => {
    const response = {
        statusCode: 200,
        message: 'Create blog successful',
        data: {},
    };

    try {
        const updateData = sanitizeUpdateData(data);
        if (updateData.term) {
            // check exist term
            const term = await Term.findOne({
                _id: updateData.term,
                isActive: true,
            });
            if (!term) {
                return {
                    statusCode: 404,
                    message: 'Term not found',
                    data: {},
                };
            }

            const now = new Date();
            const startDate = new Date(term.startDate);
            const endDate = new Date(term.endDate);

            if (startDate > now || now > endDate) {
                return {
                    statusCode: 400,
                    message: 'Term out of date',
                    data: {},
                };
            }
        }

        if (updateData.faculty) {
            // check exist faculty
            const faculty = await Faculty.findOne({
                _id: updateData.faculty,
                isActive: true,
            });
            if (!faculty) {
                return {
                    statusCode: 404,
                    message: 'Faculty not found',
                    data: {},
                };
            }
        }

        const blog = await Blog.findOneAndUpdate({ _id: blogId, isDeleted: false }, updateData, { new: true })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: 'name' })
            .populate({ path: 'term', select: 'name description startDate endDate' });
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        response.data = blog;

    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const deleteBlogService = async (blogId) => {
    const response = {
        statusCode: 200,
        message: 'Create blog successful',
        data: {},
    };

    try {
        const blog = await Blog.findOneAndUpdate({ _id: blogId, isDeleted: false }, {
            isDeleted: true,
        }, { new: true })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: 'name' })
            .populate({ path: 'term', select: 'name description startDate endDate' });
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        response.data = blog;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const uploadBlogBgImgService = async ({ blogId, file }) => {
    const response = {
        statusCode: 200,
        message: 'Upload Blog background image successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({ _id: blogId, isDeleted: false })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: 'name' })
            .populate({ path: 'term', select: 'name description startDate endDate' });
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        blog.bgImage = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
        await uploadAWS(E_TUTOR_BUCKET, `${AWS_FOLDER.IMAGE}${blog.bgImage}`, file.buffer);


        response.data = await blog.save();
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const uploadBlogFileService = async ({ blogId, files }) => {
    const response = {
        statusCode: 200,
        message: 'Upload blog files successful',
        data: {},
    };

    try {
        const blog = await Blog.findOne({ _id: blogId, isDeleted: false });
        if (!blog) {
            return {
                statusCode: 404,
                message: 'Blog not found',
                data: {},
            };
        }

        const uploadFileProcess = files.map(async (file) => {
            const filePath = `${md5(Date.now())}.${md5(file.buffer)}.${file.originalname.split('.').pop()}`;
            await uploadAWS(E_TUTOR_BUCKET, `${AWS_FOLDER.FILE}${filePath}`, file.buffer);
            await Blog.updateOne({ _id: blogId, isDeleted: false }, {
                $push: {
                    files: {
                        fileName: file.originalname,
                        filePath,
                    },
                },
            });
        });

        await Promise.all(uploadFileProcess);

        const newBlog = await Blog.findOne({ _id: blogId, isDeleted: false })
            .populate({ path: 'createdBy', select: 'email profile.firstName profile.lastName profile.avatar' })
            .populate({ path: 'faculty', select: 'name' })
            .populate({ path: 'term', select: 'name description startDate endDate' });

        response.data = newBlog;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const downloadBlogFileService = async ({ blogId, fileId }) => {
    const response = {
        statusCode: 200,
        message: 'Download file successful',
        data: {},
    };

    try {
        const file = await Blog.aggregate([
            {
                $match: {
                    _id: new mongoDb.ObjectId(blogId)
                }
            },
            {
                $project: {
                    _id: 0,
                    files: 1
                }
            },
            {
                $unwind: '$files'
            },
            {
                $match: {
                    'files._id': new mongoDb.ObjectId(fileId)
                }
            }
        ]);

        if (!file[0].files) {
            return {
                statusCode: 404,
                message: 'File not found',
                data: {},
            };
        }

        const downloadFile = await downloadAWS(E_TUTOR_BUCKET, `${AWS_FOLDER.FILE}${file[0].files.filePath}`);

        response.message = file[0].files.fileName;
        response.data = zipFile(file[0].files.fileName, downloadFile.Body);
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const removeBlogFileService = async ({ blogId, fileId }) => {
    const response = {
        statusCode: 200,
        message: 'Remove file successful',
        data: {},
    };

    try {
        const file = await Blog.aggregate([
            {
                $match: {
                    _id: new mongoDb.ObjectId(blogId)
                }
            },
            {
                $project: {
                    _id: 0,
                    files: 1
                }
            },
            {
                $unwind: '$files'
            },
            {
                $match: {
                    'files._id': new mongoDb.ObjectId(fileId)
                }
            }
        ]);

        if (!file[0].files) {
            return {
                statusCode: 404,
                message: 'File not found',
                data: {},
            };
        }

        await Blog.updateOne({ _id: blogId }, {
            $pull: {
                files: file[0].files
            }
        });

        response.data = file[0].files;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};
