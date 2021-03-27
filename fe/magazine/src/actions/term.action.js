import axios from 'axios';
import qs from 'qs';

import {
    TERM_DETAIL_REQUEST,
    TERM_DETAIL_SUCCESS,
    TERM_DETAIL_FAIL,
    TERM_LIST_REQUEST,
    TERM_LIST_SUCCESS,
    TERM_LIST_FAIL,
} from '../constants/term.reducer';
import { API_CONFIG } from '../config';
import { getToken } from '../utils';

export const termDetailAction = (id) => async (dispatch) => {
    try {
        const token = getToken();
        dispatch({ type: TERM_DETAIL_REQUEST });

        const { data: { data } } = await axios.get( `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/terms/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        dispatch({
            type: TERM_DETAIL_SUCCESS,
            payload: data,
        });
    } catch(error) {
        dispatch({
            type: TERM_DETAIL_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const termListAction = (filter = {}) => async (dispatch) => {
    try {
        const token = getToken();
        dispatch({ type: TERM_LIST_REQUEST });
        const query = qs.stringify(filter);
        let endpoint = `${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/terms`;
        if (query) {
            endpoint += `?${query}`;
        }

        const { data: { data } } = await axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        dispatch({
            type: TERM_LIST_SUCCESS,
            payload: data,
        });
    } catch(error) {
        dispatch({
            type: TERM_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
