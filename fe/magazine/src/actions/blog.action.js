import axios from 'axios';
import qs from 'qs';
import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
} from '../constants/blog.reducer';
import { API_CONFIG } from '../config';
import { getToken } from '../utils';

export const blogListAction = (filter = {}) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_LIST_REQUEST });
        const token = getToken();
        const query = qs.stringify(filter);
        let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs`;
        if (query) {
            endpoint += `?${query}`;
        }
        const { data: { data } } = await axios.get(endpoint, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        dispatch({
            type: BLOG_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BLOG_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
