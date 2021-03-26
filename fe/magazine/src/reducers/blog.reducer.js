import {
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL,
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
} from '../constants/blog.reducer';

const blogDetailReducer = (state = { blog: [] }, action) => {
    switch (action.type) {
        case BLOG_DETAIL_REQUEST:
            return {
                loading: true,
            };
        case BLOG_DETAIL_SUCCESS:
            return {
                loading: false,
                blog: action.payload,
            };
        case BLOG_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const blogListReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
        case BLOG_LIST_REQUEST:
            return {
                loading: true,
            };
        case BLOG_LIST_SUCCESS:
            return {
                loading: false,
                blogs: action.payload,
            };
        case BLOG_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default {
    blogDetail: blogDetailReducer,
    blogList: blogListReducer,
};
