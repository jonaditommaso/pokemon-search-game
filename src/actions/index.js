import { 
    SIGN_IN, 
    SIGN_OUT, 
    PLAY_MUSIC, 
    PAUSE_MUSIC, 
    I_CHOOSE_YOU, 
    PLAY_MUSIC_BATTLE, 
    PAUSE_MUSIC_BATTLE, 
    THERE_IS_BATTLE,
    NO_BATTLE } from './types';


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

export const musicBattle = () => {
    return {
        type: PLAY_MUSIC_BATTLE
    }
}

export const musicBattlePause = () => {
    return {
        type: PAUSE_MUSIC_BATTLE
    }
}

export const chooseYou = (pokemon)=> {
    return {
        type: I_CHOOSE_YOU,
        payload: pokemon
    }
};

export const thereBattle = (pokemon)=> {
    return {
        type: THERE_IS_BATTLE,
        payload: pokemon
    }
};

export const noBattle = (pokemon)=> {
    return {
        type: NO_BATTLE,
        payload: pokemon
    }
};