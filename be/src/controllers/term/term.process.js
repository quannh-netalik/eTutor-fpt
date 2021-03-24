import { Term } from '../../models/term.model.js';
import { sanitizeData } from './term.validator.js';

export const getTermService = async (termId) => {
    const response = {
        statusCode: 200,
        message: 'Showing term detail',
        data: {}
    };

    try {
        const terms = await Term.findById(termId);
        response.data = await Term.populate(terms, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const listTermService = async (filter = {}) => {
    const response = {
        statusCode: 200,
        message: 'Showing list term',
        data: {}
    };

    try {
        const terms = await Term.find(filter);
        response.data = await Term.populate(terms, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const createTermService = async ({ data, user: currentUser }) => {
    const response = {
        statusCode: 200,
        message: 'Create term successful',
        data: {}
    };

    try {
        const term = new Term({
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            createdBy: currentUser._id,
        });

        const newTerm = await term.save();
        response.data = await Term.populate(newTerm, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};

export const updateTermService = async ({ termId, data }) => {
    const response = {
        statusCode: 200,
        message: 'Update term successful',
        data: {}
    };

    try {
        const updateData = sanitizeData(data);
        const term = await Term.findByIdAndUpdate({ _id: termId }, updateData, { new: true });
        if (!term) {
            return {
                statusCode: 404,
                message: 'Term not found',
                data: {}
            };
        }

        response.data = await Term.populate(term, { path: 'createdBy', select: 'email profile' });
    } catch (err) {
        response.statusCode = 500;
        response.message = err.message;
    }

    return response;
};
