import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import musicReducer from './musicReducer';

export default combineReducers({
    login: loginReducer,
    music: musicReducer
});