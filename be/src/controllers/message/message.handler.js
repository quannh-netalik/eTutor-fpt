import { getMessagesService } from './message.process.js';

export const listMessages = async (req, res) => {
    const { statusCode, message, data } = await getMessagesService(req.query);

    return res.status(statusCode).json({ statusCode, message, data });
};
