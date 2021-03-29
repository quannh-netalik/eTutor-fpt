import { Message } from '../../models/message.model.js';

export const getMessagesService = async () => {
    const response = {
        statusCode: 200,
        message: 'Get list message',
        data: {}
    };
    try {
        const message = await Message.aggregate([
            { $lookup: { from: 'users', localField: 'sender', foreignField: '_id', as: 'sender' } },
            { $lookup: { from: 'users', localField: 'receiver', foreignField: '_id', as: 'receiver' } },
            { $unwind: '$sender' },
            { $unwind: '$receiver' },
        ]);
        response.data = message;
    } catch (error) {
        response.statusCode = 500;
        response.message = err.message;
    }
    return response;
};
