import axios from 'axios';
import { API_CONFIG } from '../config';
import {
    STATISTIC_REPORT_REQUEST,
    STATISTIC_REPORT_SUCCESS,
    STATISTIC_REPORT_FAIL
} from '../constants/report.constant';
import { getToken } from '../utils';

export const statisticReport = () => async (dispatch) => {
    try {
        dispatch({ type: STATISTIC_REPORT_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/reports`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: STATISTIC_REPORT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: STATISTIC_REPORT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

