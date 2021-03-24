import axios from 'axios';
import qs from 'qs';
import { API_CONFIG } from '../config';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
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

export const getUserListAction = (filter) => async (dispatch) => {
    try {
        dispatch({ type: USER_LIST_REQUEST });
        const token = getToken();
        const query = qs.stringify(filter);
        let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/users`;
        console.log(endpoint);
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
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
