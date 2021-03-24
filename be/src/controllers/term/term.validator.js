import expressValidator from 'express-validator';

export const sanitizeData = (data) => {
    const result = {};
    if (data.name) {
        result.name = data.name;
    }

    if (data.description) {
        result.description = data.description;
    }

    if (data.startDate) {
        result.startDate = data.startDate;
    }

    if (data.endDate) {
        result.endDate = data.endDate;
    }

    if (data.isActive) {
        result.isActive = data.isActive;
    }

    return result;
};

export const createTerm = [
    expressValidator.body('name').notEmpty().withMessage('name is required'),
    expressValidator.body('startDate').notEmpty().withMessage('startDate is required'),
    expressValidator.body('endDate').notEmpty().withMessage('endDate is required'),
];
