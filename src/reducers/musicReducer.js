import { PLAY_MUSIC, PAUSE_MUSIC} from '../actions/types';

const INITIAL_STATE = {volume: true};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAY_MUSIC:
            return {...state, volume: true};
        
        case PAUSE_MUSIC:
            return {...state, volume: false};
        
        default:
            return state;
    }
};