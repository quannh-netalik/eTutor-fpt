import {
    getTermService,
    listTermService,
    createTermService,
    updateTermService,
} from './term.process.js';

export const getTerm = async (req, res) => {
    const { statusCode, message, data } = await getTermService(req.params.id);

    return res.status(statusCode).send({ statusCode, message, data });
};


export const listTerm = async (req, res) => {
    const { statusCode, message, data } = await listTermService(req.query);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const createTerm = async (req, res) => {
    const { statusCode, message, data } = await createTermService({ data: req.body, user: req.user });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const updateTerm = async (req, res) => {
    const { statusCode, message, data } = await updateTermService({ termId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};
