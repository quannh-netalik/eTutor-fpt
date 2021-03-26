import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import blogReducer from './blog.reducer';

export default combineReducers({
    ...userReducer,
    ...blogReducer,
});
