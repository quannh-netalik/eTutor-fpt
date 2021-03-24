import expressValidator from 'express-validator';

export const queryBuilder = (data) => {
    const result = {};
    if (data.title) {
        result.title = { $regex: `.*${data.title}.*`, $options: 'i' };
    }

    if (data.content) {
        result.content = { $regex: `.*${data.content}.*`, $options: 'i' };
    }

    if (data.status) {
        result.status = data.status;
    }

    if (data.faculty) {
        result.faculty = data.faculty;
    }

    if (data.term) {
        result.term = data.term;
    }

    return result;
};

export const sanitizeUpdateData = (data) => {
    const result = {};
    if (data.title) {
        result.title = data.title;
    }

    if (data.content) {
        result.content = data.content;
    }

    if (data.status) {
        result.status = data.status;
    }

    if (data.faculty) {
        result.faculty = data.faculty;
    }

    if (data.term) {
        result.term = data.term;
    }

    return result;
};

export const createBlog = [
    expressValidator.body('title').notEmpty().withMessage('title is required'),
    expressValidator.body('content').notEmpty().withMessage('content is required'),
    expressValidator.body('faculty').notEmpty().withMessage('faculty is required'),
    expressValidator.body('term').notEmpty().withMessage('term is required'),
];
