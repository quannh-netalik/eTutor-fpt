import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
} from '../constants/blog.reducer';

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
    blogList: blogListReducer,
};
