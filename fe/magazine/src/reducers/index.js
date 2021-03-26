import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import blogReducer from './blog.reducer';
import commentReducer from './comment.reducer';

export default combineReducers({
    ...userReducer,
    ...blogReducer,
    ...commentReducer,
});
