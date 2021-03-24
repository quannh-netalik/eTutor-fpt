import {
    TERM_DETAIL_REQUEST,
    TERM_DETAIL_SUCCESS,
    TERM_DETAIL_FAIL,
    TERM_DETAIL_RESET,
    TERM_LIST_REQUEST,
    TERM_LIST_SUCCESS,
    TERM_LIST_FAIL,
    TERM_CREATE_REQUEST,
    TERM_CREATE_SUCCESS,
    TERM_CREATE_FAIL,
    TERM_UPDATE_REQUEST,
    TERM_UPDATE_SUCCESS,
    TERM_UPDATE_FAIL,
} from '../constants/term.constant';

export const getTermDetailReducer = (state = { term: {} }, action) => {
    switch (action.type) {
        case TERM_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case TERM_DETAIL_SUCCESS:
            return {
                loading: false,
                term: action.payload,
            };
        case TERM_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case TERM_DETAIL_RESET:
            return {};
        default:
            return state;
    }
};

export const listTermReducer = (state = { terms: [] }, action) => {
    switch (action.type) {
        case TERM_LIST_REQUEST:
            return {
                loading: true,
            };
        case TERM_LIST_SUCCESS:
            return {
                loading: false,
                terms: action.payload,
            };
        case TERM_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const createTermReducer = (state = { term: {} }, action) => {
    switch (action.type) {
        case TERM_CREATE_REQUEST:
            return {
                loading: true,
            };
        case TERM_CREATE_SUCCESS:
            return {
                loading: false,
                term: action.payload,
            };
        case TERM_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


export const updateTermReducer = (state = { term: {} }, action) => {
    switch (action.type) {
        case TERM_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case TERM_UPDATE_SUCCESS:
            return {
                loading: false,
                term: action.payload,
            };
        case TERM_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default {
    termDetail: getTermDetailReducer,
    listTerm: listTermReducer,
    crateTerm: createTermReducer,
    updateTerm: updateTermReducer,
};
