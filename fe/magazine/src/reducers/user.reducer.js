import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_RESET,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL
} from '../constants/user.constant';

const defaultLoginState = {};
const userLoginReducer = (state = defaultLoginState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            };
        case USER_LOGIN_SUCCESS: {
            return {
                loading: false,
                user: action.payload
            };
        }
        case USER_LOGIN_FAIL: {
            return {
                loading: false,
                error: action.payload
            };
        }
        case USER_LOGIN_RESET:
            return {};
        default:
            return state;
    }
};


const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                loading: true
            };
        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                user: action.payload
            };
        case USER_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case USER_UPDATE_RESET:
            return {};
        default:
            return state;
    }
};

const userListReducer = (state = { userList: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return {
                loading: true
            };
        case USER_LIST_SUCCESS:
            return {
                loading: false,
                userList: action.payload
            };
        case USER_LIST_FAIL:
            return {};
        default:
            return state;
    }
};

export default {
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    userList: userListReducer
};
