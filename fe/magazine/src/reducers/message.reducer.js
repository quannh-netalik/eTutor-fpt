import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAILURE,
    GET_MESSAGE_AFTER_SEND
} from '../constants/message.constant';

export const messageListReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return {
                loading: true,
            };
        case GET_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: action.payload,
            };
        case GET_MESSAGES_FAILURE:
            return {
                loading: false,
                error: action.payload,
            };
        case GET_MESSAGE_AFTER_SEND:
            return {
                messages: state.messages.concat(action.payload)
            };
        default:
            return state;
    }
};

export default {
    messageList: messageListReducer,
};
