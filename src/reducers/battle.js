import { THERE_IS_BATTLE, NO_BATTLE } from '../actions/types';

const INITIAL_STATE = {pokemon: null};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case THERE_IS_BATTLE:
            return {...state, pokemon: true};

        case NO_BATTLE:
            return {...state, pokemon: false};
        
        default:
            return state;
    }
};