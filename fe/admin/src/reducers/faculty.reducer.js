import {
    FACULTY_DETAIL_REQUEST,
    FACULTY_DETAIL_SUCCESS,
    FACULTY_DETAIL_FAIL,
    FACULTY_DETAIL_RESET,
    FACULTY_LIST_REQUEST,
    FACULTY_LIST_SUCCESS,
    FACULTY_LIST_FAIL,
    FACULTY_CREATE_REQUEST,
    FACULTY_CREATE_SUCCESS,
    FACULTY_CREATE_FAIL,
    FACULTY_UPDATE_REQUEST,
    FACULTY_UPDATE_SUCCESS,
    FACULTY_UPDATE_FAIL,
    FACULTY_DELETE_REQUEST,
    FACULTY_DELETE_SUCCESS,
    FACULTY_DELETE_FAIL,
} from '../constants/faculty.constant';

export const getFacultyDetailReducer = (state = { faculty: {} }, action) => {
    switch (action.type) {
        case FACULTY_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case FACULTY_DETAIL_SUCCESS:
            return {
                loading: false,
                faculty: action.payload,
            };
        case FACULTY_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case FACULTY_DETAIL_RESET:
            return {};
        default:
            return state;
    }
};

export const listFacultyReducer = (state = { faculties: [] }, action) => {
    switch (action.type) {
        case FACULTY_LIST_REQUEST:
            return {
                loading: true,
            };
        case FACULTY_LIST_SUCCESS:
            return {
                loading: false,
                faculties: action.payload,
            };
        case FACULTY_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const createFacultyReducer = (state = { faculty: {} }, action) => {
    switch (action.type) {
        case FACULTY_CREATE_REQUEST:
            return {
                loading: true,
            };
        case FACULTY_CREATE_SUCCESS:
            return {
                loading: false,
                faculty: action.payload,
            };
        case FACULTY_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


export const updateFacultyReducer = (state = { faculty: {} }, action) => {
    switch (action.type) {
        case FACULTY_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case FACULTY_UPDATE_SUCCESS:
            return {
                loading: false,
                faculty: action.payload,
            };
        case FACULTY_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const deleteFacultyReducer = (state = { faculty: {} }, action) => {
    switch (action.type) {
        case FACULTY_DELETE_REQUEST:
            return {
                loading: true,
            };
        case FACULTY_DELETE_SUCCESS:
            return {
                loading: false,
                faculty: action.payload,
            };
        case FACULTY_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default {
    facultyDetail: getFacultyDetailReducer,
    listFaculty: listFacultyReducer,
    crateFaculty: createFacultyReducer,
    updateFaculty: updateFacultyReducer,
    deleteFaculty: deleteFacultyReducer,
};
