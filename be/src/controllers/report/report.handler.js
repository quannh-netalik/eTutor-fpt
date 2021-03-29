import { statisticService } from './report.process.js';

export const statistic = async (req, res) => {
    const { statusCode, message, data } = await statisticService(req.query);

    return res.status(statusCode).json({ statusCode, message, data });
};
