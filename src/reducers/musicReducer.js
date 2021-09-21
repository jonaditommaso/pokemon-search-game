import { PLAY_MUSIC, PAUSE_MUSIC, PLAY_MUSIC_BATTLE, PAUSE_MUSIC_BATTLE} from '../actions/types';

const INITIAL_STATE = {volume: false, other: false};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAY_MUSIC:
            return {...state, volume: true};
        
        case PAUSE_MUSIC:
            return {...state, volume: false};

        case PLAY_MUSIC_BATTLE:
            return {...state, other: true };

        case PAUSE_MUSIC_BATTLE:
            return {...state, other: false };
        
        default:
            return state;
    }
};