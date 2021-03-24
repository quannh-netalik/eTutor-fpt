import {
  SET_USER,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING_USER,
  SET_LOADING_ROUTER,
} from '../constants/actionsType';
import Cookies from 'js-cookie';

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  };
};

export const logout = () => {
  Cookies.remove('access_token');
  return {
    type: LOGOUT,
  };
};
export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const setLoadingUser = (isLoadingUser) => ({
  type: SET_LOADING_USER,
  isLoadingUser,
});

export const setLoadingRouter = (isLoadingRouter) => ({
  type: SET_LOADING_ROUTER,
  isLoadingRouter,
});
