import express from 'express';
import * as messageController from '../controllers/message/message.handler.js';
import { verifyToken } from '../middlewares/index.js';


const router = express.Router();

export default (prefix) => {
    prefix.use('/messages', verifyToken, router);

    router.get('/', messageController.listMessages);
};
