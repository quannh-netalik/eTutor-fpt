import axios from 'axios';

import {
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_SUCCESS,
    COMMENT_LIST_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    COMMENT_CREATE_FAIL,
} from '../constants/comment.constant';
import { API_CONFIG } from '../config';
import { getToken } from '../utils';

export const commentListAction = (blogId) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_LIST_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/comments?blog=${blogId}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const commentCreateAction = (body) => async (dispatch) => {
    try {
        dispatch({ type: COMMENT_CREATE_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/comments`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        dispatch({
            type: COMMENT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
