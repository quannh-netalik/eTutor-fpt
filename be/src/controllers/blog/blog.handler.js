import {
    getBlogService,
    listBlogService,
    createBlogService,
    updateBlogService,
    deleteBlogService,
    uploadBlogBgImgService,
    uploadBlogFileService,
    downloadBlogFileService,
    removeBlogFileService,
} from './blog.process.js';
import { queryBuilder } from './blog.validator.js';

export const getBlog = async (req, res) => {
    const { statusCode, message, data } = await getBlogService(req.params.id);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const listBlog = async (req, res) => {
    const query = queryBuilder(req.query);

    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = parseInt(req.query.skip, 10) || 0;
    const { statusCode, message, data } = await listBlogService(query, limit, skip);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const createBlog = async (req, res) => {
    const { statusCode, message, data } = await createBlogService({ data: req.body, user: req.user });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const updateBlog = async (req, res) => {
    const { statusCode, message, data } = await updateBlogService({ blogId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const deleteBlog = async (req, res) => {
    const { statusCode, message, data } = await deleteBlogService(req.params.id);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const uploadBlogBgImg = async (req, res) => {
    const { statusCode, message, data } = await uploadBlogBgImgService({ blogId: req.params.id, file: req.file });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const uploadBlogFile = async (req, res) => {
    const { statusCode, message, data } = await uploadBlogFileService({ blogId: req.params.id, files: req.files });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const downloadBlogFile = async (req, res) => {
    const { statusCode, message, data } = await downloadBlogFileService({ blogId: req.params.id, fileId: req.params.fileId });

    res.set({
        // zip
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${message}.zip`,
        'Content-Length': data.length,

        // prevent cache
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0
    });

    return res.status(statusCode).send(data);
};

export const removeBlogFile = async (req, res) => {
    const { statusCode, message, data } = await removeBlogFileService({ blogId: req.params.id, fileId: req.params.fileId });

    return res.status(statusCode).send({ statusCode, message, data });
};
