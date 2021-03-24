import express from 'express';

import { validateRole, verifyToken, validateRequest } from '../middlewares/index.js';
import * as termController from '../controllers/term/term.handler.js';
import * as termValidator from '../controllers/term/term.validator.js';

const router = express.Router();
export default (prefix) => {
    prefix.use('/terms', verifyToken, router);

    router.get('/:id', termController.getTerm);
    router.get('/', termController.listTerm);

    // only admin can create term
    router.post('/',
        validateRole(['admin']),
        termValidator.createTerm,
        validateRequest,
        termController.createTerm
    );

    // only admin can create term
    router.put('/:id',
        validateRole(['admin']),
        termController.updateTerm
    );
};
