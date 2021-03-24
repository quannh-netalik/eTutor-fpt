import express from 'express';

import { validateRole, verifyToken, validateRequest } from '../middlewares/index.js';
import * as facultyValidator from '../controllers/faculty/faculty.validator.js';
import * as facultyController from '../controllers/faculty/faculty.handler.js';

const router = express.Router();

export default (prefix) => {
    prefix.use('/faculty', verifyToken, validateRole(['admin']), router);

    router.get('/:id', facultyController.getFaculty);
    router.get('/', facultyController.getListFaculty);
    router.post('/', facultyValidator.createFaculty, validateRequest, facultyController.createNewFaculty);
    router.put('/:id', facultyController.updateFaculty);
    router.delete('/:id', facultyController.deleteFaculty);
};
