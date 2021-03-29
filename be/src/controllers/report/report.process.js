import { Blog } from '../../models/blog.model.js';

export const statisticService = async (filter = {}) => {
    const response = {
        statusCode: 200,
        message: 'Statistic',
        data: {}
    };

    try {
        const statistic = await Blog.aggregate([
            {
                $lookup: {
                    from: 'faculties',
                    localField: 'faculty',
                    foreignField: '_id',
                    as: 'faculty_info',
                }
            },
            { $unwind: '$faculty_info' },
            {
                $match: {
                    ...filter,
                }
            },
            {
                $group: {
                    _id: {
                        term: '$term',
                        faculty: '$faculty',
                        facultyName: '$faculty_info.name',
                        status: '$status',
                    },
                    count: {
                        $sum: 1,
                    },
                }
            },
            { $sort: { count: -1 } },
        ]);

        response.data = statistic;
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};
