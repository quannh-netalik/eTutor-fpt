import { combineReducers } from 'redux';
import connectionReducer from './connectionReducer';

// Initilaizing statest for something special.
export default combineReducers({
  connectionReducer,
});
