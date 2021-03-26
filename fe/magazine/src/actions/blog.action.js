import axios from 'axios';
import qs from 'qs';

import {
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL,
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
} from '../constants/blog.reducer';
import { API_CONFIG } from '../config';
import { getToken } from '../utils';

export const blogDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_DETAIL_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        dispatch({
            type: BLOG_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: BLOG_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

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

export const downloadBlogFile = ({ fileId, fileName, blogId }) => async () => {
    try {
        const token = getToken();
        const data = await fetch(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${blogId}/files/${fileId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        const blob = await data.blob();
        let url = window.URL.createObjectURL(blob, { type: 'application/zip' });
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName + '.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
    }
};
