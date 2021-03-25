import axios from 'axios';
import qs from 'qs';
import imageCompression from 'browser-image-compression';
import { API_CONFIG } from '../config';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_CREATE_REQUEST,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from '../constants/user.constant';
import { getToken } from '../utils';

export const userLoginAction = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/login`, { email, password }, {
            headers: {
                'Content-type': 'application/json',
            },
        });

        if (data.user.profile.role !== 'admin') {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: 'Role is now allowed',
            });

            return;
        }

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.user
        });

        localStorage.setItem('jwt', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    dispatch({ type: USER_LOGIN_RESET });
};

export const getUserDetailAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getUserListAction = (filter) => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const token = getToken();
        const query = qs.stringify(filter);
        let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users`;
        if (query) {
            endpoint += `?${query}`;
        }
        const { data: { data } } = await axios.get(endpoint, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createUserAction = (body) => async (dispatch) => {
    try {
        dispatch({ type: USER_CREATE_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateUserAction = ({ id, body }) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const token = getToken();
        console.log(token);
        const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/${id}`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const uploadUserAvatarAction = ({ id, file }) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const token = getToken();

        const uploadAvatar = await imageCompression(file, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        });

        const payload = new FormData();
        payload.append('avatar', uploadAvatar);

        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/${id}/avatar`, payload, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_DETAIL_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deleteUserAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.delete(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
