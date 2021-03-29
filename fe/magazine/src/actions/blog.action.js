import axios from 'axios';
import qs from 'qs';
import imageCompression from 'browser-image-compression';

import {
    BLOG_DETAIL_REQUEST,
    BLOG_DETAIL_SUCCESS,
    BLOG_DETAIL_FAIL,
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
    BLOG_CREATE_REQUEST,
    BLOG_CREATE_SUCCESS,
    BLOG_CREATE_FAIL,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,
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

export const blogCreateAction = ({body, bgImage, file}) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_CREATE_REQUEST });
        const token = getToken();
        // 1. create blog
        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // 2. upload bgImage (check if existed bgImage)
        if (bgImage.name) {
            const uploadBgImage = await imageCompression(bgImage, {
                maxSizeMB: 0.1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });

            const payloadBgImage = new FormData();
            payloadBgImage.append('bgImage', uploadBgImage);

            await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${data._id}/bg-image`, payloadBgImage, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        }

        // 3. upload file (check if existed file)
        if (file.name) {
            const payloadFile = new FormData();
            payloadFile.append('files', file);

            await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${data._id}/files`, payloadFile, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
        }

        dispatch({
            type: BLOG_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: BLOG_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateBlogAction = ({id, body}) => async (dispatch) => {
    try {
        dispatch({ type: BLOG_UPDATE_REQUEST });
        const token = getToken();

        const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${id}`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        dispatch({
            type: BLOG_UPDATE_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: BLOG_UPDATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const uploadBlogBgImageAction = (blogId, bgImage) => async () => {
    try {
        const token = getToken();

        const uploadBgImage = await imageCompression(bgImage, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        });

        const payloadBgImage = new FormData();
        payloadBgImage.append('bgImage', uploadBgImage);

        await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${blogId}/bg-image`, payloadBgImage, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const uploadBlogFileAction = (blogId, file) => async (dispatch) => {
    try {
        const token = getToken();

        const payloadFile = new FormData();
        payloadFile.append('files', file);

        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${blogId}/files`, payloadFile, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: BLOG_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const removeFileBlogAction = ({ blogId, fileId }) => async () => {
    try {
        const token = getToken();
        await axios.delete(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/blogs/${blogId}/files/${fileId}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch(error) {
        console.log(error);
    }
};
