import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {user: null};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, user: action.payload};
        
        case SIGN_OUT:
            return {...state, user: null};
        
        default:
            return state;
    }
};