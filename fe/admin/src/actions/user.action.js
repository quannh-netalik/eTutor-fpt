import axios from 'axios';
import { API_CONFIG } from '../config';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
} from '../constants/user.constant';

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
