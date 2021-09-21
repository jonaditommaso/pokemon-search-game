import { combineReducers } from 'redux';
import fightReducer from './fightReducer';
import loginReducer from './loginReducer';
import musicReducer from './musicReducer';
import battle from './battle';

export default combineReducers({
    login: loginReducer,
    music: musicReducer,
    fight: fightReducer,
    battle: battle
});