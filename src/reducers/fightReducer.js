import { I_CHOOSE_YOU } from '../actions/types';

const INITIAL_STATE = {pokemon: null};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case I_CHOOSE_YOU:
            return {...state, pokemon: action.payload};
        
        default:
            return state;
    }
};