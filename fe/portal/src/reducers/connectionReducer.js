import {
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER,
  SET_LOADING_USER,
  SET_LOADING_ROUTER,
} from '../constants/actionsType';
const initialState = {
  isLogged: false,
  user: null,
  isLoadingUser: false,
  isLoadingRouter: false,
};
// Initiali settups and then we set these as a global state for users....
const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLogged: true,
        isLoadingUser: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        user: null,
        isLoadingUser: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_LOADING_USER:
      return {
        ...state,
        isLoadingUser: action.isLoadingUser,
      };
    case SET_LOADING_ROUTER:
      return {
        ...state,
        isLoadingRouter: action.isLoadingRouter,
      };
    default:
      return state;
  }
};

export default connectionReducer;
