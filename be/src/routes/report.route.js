import express from 'express';
import * as reportController from '../controllers/report/report.handler.js';
import { validateRole, verifyToken } from '../middlewares/index.js';

const router = express.Router();
export default (prefix) => {
    prefix.use('/reports', verifyToken, validateRole(['admin']), router);

    router.get('/', reportController.statistic);
};
