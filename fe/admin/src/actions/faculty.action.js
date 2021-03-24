import axios from 'axios';
import { API_CONFIG } from '../config';
import {
    FACULTY_DETAIL_REQUEST,
    FACULTY_DETAIL_SUCCESS,
    FACULTY_DETAIL_FAIL,
    FACULTY_LIST_REQUEST,
    FACULTY_LIST_SUCCESS,
    FACULTY_LIST_FAIL,
    FACULTY_CREATE_REQUEST,
    FACULTY_CREATE_SUCCESS,
    FACULTY_CREATE_FAIL,
    FACULTY_UPDATE_REQUEST,
    FACULTY_UPDATE_SUCCESS,
    FACULTY_UPDATE_FAIL,
    FACULTY_DELETE_REQUEST,
    FACULTY_DELETE_SUCCESS,
    FACULTY_DELETE_FAIL,
} from '../constants/faculty.constant';

export const getFaculty = (id) => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_DETAIL_REQUEST });
        const token = localStorage.getItem('jwt');
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/faculty/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: FACULTY_DETAIL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FACULTY_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getListFaculty = () => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_LIST_REQUEST });
        const token = localStorage.getItem('jwt');
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/faculty`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: FACULTY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: FACULTY_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createFacultyAction = (body) => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_CREATE_REQUEST });
        const token = localStorage.getItem('jwt');
        const { data: { data } } = await axios.post(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/faculty`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: FACULTY_CREATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FACULTY_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const updateFacultyAction = ({ id, body }) => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_UPDATE_REQUEST });
        const token = localStorage.getItem('jwt');
        const { data: { data } } = await axios.put(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/faculty/${id}`, body, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: FACULTY_UPDATE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FACULTY_UPDATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const deleteFacultyAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: FACULTY_DELETE_REQUEST });
        const token = localStorage.getItem('jwt');
        const { data: { data } } = await axios.delete(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/faculty/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: FACULTY_DELETE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FACULTY_DELETE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
