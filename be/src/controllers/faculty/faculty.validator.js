import expressValidator from 'express-validator';

export const createFaculty = [
    expressValidator.body('name').notEmpty().withMessage('name is required'),
];
