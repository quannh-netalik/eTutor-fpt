import {
    TERM_DETAIL_REQUEST,
    TERM_DETAIL_SUCCESS,
    TERM_DETAIL_FAIL,
    TERM_LIST_REQUEST,
    TERM_LIST_SUCCESS,
    TERM_LIST_FAIL,
} from '../constants/term.reducer';

export const termDetailReducer = (state = { term: {} }, action) => {
    switch (action.type) {
        case TERM_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case TERM_DETAIL_SUCCESS:
            return {
                loading: false,
                term: action.payload
            };
        case TERM_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const termListReducer = (state = { terms: [] }, action) => {
    switch (action.type) {
        case TERM_LIST_REQUEST:
            return {
                loading: true,
            };
        case TERM_LIST_SUCCESS:
            return {
                loading: false,
                terms: action.payload
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

export default {
    termDetail: termDetailReducer,
    termList: termListReducer,
};
