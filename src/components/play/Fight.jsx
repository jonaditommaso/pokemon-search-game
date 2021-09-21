import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../styles/fight.css';
import Fighter from './Fighter';
import { connect } from 'react-redux';
import { musicBattle, musicBattlePause } from '../../actions/index';
import Alert from '../log/Alert';

const Fight = ({thereIsUser, fighter, music, musicBattle, musicBattlePause, battle}) => {
    
    const [showButton, setShowButton] = useState('showingButton');
    const [showVideo, setShowVideo] = useState('d-none');
    const [showBattle, setShowBattle] = useState('d-none');

    const [preparationWrap, setPreparationWrap] = useState('');

    useEffect(() => {
        const battleMusic = document.getElementById('pokemon-battle');
        // if(music.other === false) {
        //     battleMusic.pause();
        //     musicBattlePause();
        // }
        if(music.other && !music.volume) {
            battleMusic.pause();
        }
        if(music.other && music.volume) {
            battleMusic.play()
        }
    }, [music]);

    const handlePlay = () => {
        setShowButton('d-none');
        setShowVideo('showingVideo');

        if(music.volume) {
            const battle = document.getElementById('pokemon-battle');
            musicBattle();
            battle.play();

            battle.addEventListener('ended', () => {
                musicBattlePause();
            })
        }

        const video = document.getElementById('video');
        video.play();
    }

    

    if(showVideo === 'showingVideo') {
        const video = document.getElementById('video');
        const pokemonName = document.getElementById('pokemon-name');

        video.addEventListener('ended', () => {
            setShowVideo('d-none');
            setShowBattle('fight');
            setPreparationWrap('d-none');
            pokemonName.play()
        });
    }
    
    return ( 
        <>
        {!thereIsUser 
            ? <Alert />
            : (
            <div>
                <div className={preparationWrap}>
                <Button variant="danger" size="lg" onClick={() => handlePlay()} className={showButton}>FIGHT!</Button>
                    
                    <video 
                    src='/video/pokeballgo.mp4'
                    type="audio/mp4" 
                    preload="auto" 
                    id="video" 
                    // autoPlay 
                    className={showVideo}
                    >
                    </video> 
                    <audio
                    src='/audio/pokemon-battle.mp3'
                    type="audio/mpeg" 
                    preload="auto" 
                    id="pokemon-battle" 
                    controls 
                    // autoPlay 
                    style={{display: 'none'}}
                >
                </audio>
                <audio
                    src={`/audio/voices/${fighter?.pokemon.name}.mp3`}
                    type="audio/mpeg" 
                    preload="auto" 
                    id="pokemon-name" 
                    controls 
                    // autoPlay 
                    style={{display: 'none'}}
                >
                </audio>
                </div>

                <div className={showBattle}>
                    <Fighter />
                </div>
            </div>
            )}
        </>
    );
}


const mapStateToProps = (state) => {
    return { 
        fighter: state.fight,
        music: state.music,
        battle: state.battle,
        thereIsUser: state.login.user
    }
}
 
export default connect(mapStateToProps, { musicBattle, musicBattlePause })(Fight);