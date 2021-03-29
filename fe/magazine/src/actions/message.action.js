import axios from 'axios';
import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_MESSAGE_AFTER_SEND
} from '../constants/message.constant';
import { API_CONFIG } from '../config';
import { getToken } from '../utils';

export const messageListAction = () => async (dispatch) => {
    try {
        dispatch({ type: GET_MESSAGES_REQUEST });
        const token = getToken();
        const { data: { data } } = await axios.get(`${API_CONFIG.END_POINT}${API_CONFIG.PREFIX}/messages/`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        dispatch({
            type: GET_MESSAGES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_MESSAGES_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const afterSendMessage = (msg) => async (dispatch) => {
    dispatch({
        type: GET_MESSAGE_AFTER_SEND,
        payload: msg
    });
};


