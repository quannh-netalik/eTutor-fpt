import axios from 'axios';
import { API_CONFIG } from '../config';
import {
    TERM_DETAIL_REQUEST,
    TERM_DETAIL_SUCCESS,
    TERM_DETAIL_FAIL,
    TERM_LIST_REQUEST,
    TERM_LIST_SUCCESS,
    TERM_LIST_FAIL,
    TERM_CREATE_REQUEST,
    TERM_CREATE_SUCCESS,
    TERM_CREATE_FAIL,
    TERM_UPDATE_REQUEST,
    TERM_UPDATE_SUCCESS,
    TERM_UPDATE_FAIL,
} from '../constants/term.constant';
import { getToken } from '../utils';

export const getTerm = (id) => async (dispatch) => {
    try {
        dispatch({ type: TERM_DETAIL_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/terms/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: TERM_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TERM_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getListTerm = () => async (dispatch) => {
    try {
        dispatch({ type: TERM_LIST_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/terms`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: TERM_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TERM_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createTermAction = (body) => async (dispatch) => {
    try {
        dispatch({ type: TERM_CREATE_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/terms`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: TERM_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: TERM_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateTermAction = ({ id, body }) => async (dispatch) => {
    try {
        dispatch({ type: TERM_UPDATE_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/terms/${id}`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: TERM_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: TERM_UPDATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
