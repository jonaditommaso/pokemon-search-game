import React, { useState, useEffect } from 'react';
import '../../styles/navbar.css';
import { connect } from 'react-redux';
import StateLogin from '../log/StateLogin';
import SideDropdown from './SideDropdown';
// import { POKESONG } from '../../utils/pokesong';
// import { playMusic, pauseMusic } from '../../actions/index';


const Navbar = ({thereIsUser, music, playMusic, pauseMusic}) => {

    const [showSideDropDown, setShowSideDropDown] = useState(false);

    useEffect(() => {
        if(thereIsUser && !showSideDropDown) {
            setTimeout(() => {
                setShowSideDropDown(true);
            }, 1000);
        }

    }, [thereIsUser, showSideDropDown])

    const showMenu = () => {
        return (
            thereIsUser && showSideDropDown && <SideDropdown />
        )
    }

    // const handleMusic = () => {
    //     const audio = document.getElementById('music');
        
    //     if(audio.paused===false && audio.ended===false) {
    //         audio.pause();
    //         pauseMusic();
    //     }
    //     else {
    //         audio.play();
    //         playMusic();
    //         console.log('el audio', audio.play())
    //     }
        
    // }

    // const showVolumeIcon = () => {
    //     if(music) {
    //         return (
    //             <svg className="bi bi-volume-up-fill" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"  viewBox="0 0 16 16">
    //                 <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
    //                 <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
    //                 <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
    //             </svg>
    //         )
            
    //     }
    //     else {
    //         return (
    //             <svg className="bi bi-volume-mute" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"  viewBox="0 0 16 16">
    //                 <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
    //             </svg> 
    //         )
            
    //     } 
           
    // }
    

    return ( 
        <>
            <div className="navbar">
                <StateLogin />
                {showMenu()}
            </div> 
            {/* <audio 
                // src={POKESONG} 
                type="audio/mpeg" 
                preload="auto" 
                id="music" 
                controls 
                autoPlay 
                style={{display: 'none'}}
            >
            </audio>
                    {/* Your browser does not support the audio tag. */}
            
            {/* <div className="volume" onClick={() => handleMusic ()}>
                {showVolumeIcon()}
            </div>  */}
               
        </>
           
    );
}

const mapStateToProps = (state) => {
    return { 
        thereIsUser: state.login.user
        // music: state.music.volume
    } 
}

export default connect(mapStateToProps, null)(Navbar);