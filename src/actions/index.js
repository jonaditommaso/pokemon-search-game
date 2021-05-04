import { SIGN_IN, SIGN_OUT, PLAY_MUSIC, PAUSE_MUSIC } from './types';


export const signIn = (user)=> {
    return {
        type: SIGN_IN,
        payload: user
    }
};

export const signOut = ()=> {
    return {
        type: SIGN_OUT
    }
};

export const playMusic = () => {
    return {
        type: PLAY_MUSIC
    }
}

export const pauseMusic = () => {
    return {
        type: PAUSE_MUSIC
    }
}