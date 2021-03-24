import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import facultyReducer from './faculty.reducer';
import termReducer from './term.reducer';

export default combineReducers({
    ...userReducer,
    ...facultyReducer,
    ...termReducer,
});
