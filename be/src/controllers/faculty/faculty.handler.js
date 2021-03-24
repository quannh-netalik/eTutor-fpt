import {
    getFacultyService,
    createFacultyService,
    getListFacultyService,
    updateFacultyService,
    deleteFacultyService,
} from './faculty.process.js';

export const getFaculty = async (req, res) => {
    const { statusCode, message, data } = await getFacultyService(req.params.id);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const getListFaculty = async (req, res) => {
    const { statusCode, message, data } = await getListFacultyService(req.query);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const createNewFaculty = async (req, res) => {
    const { statusCode, message, data } = await createFacultyService(req.body, req.user);

    return res.status(statusCode).send({ statusCode, message, data });
};

export const updateFaculty = async (req, res) => {
    const { statusCode, message, data } = await updateFacultyService({ facultyId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};

export const deleteFaculty = async (req, res) => {
    const { statusCode, message, data } = await deleteFacultyService({ facultyId: req.params.id, data: req.body });

    return res.status(statusCode).send({ statusCode, message, data });
};
