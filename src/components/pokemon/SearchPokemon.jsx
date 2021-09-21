import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import '../../styles/searchPokemon.css';
import pokeapi from '../../utils/pokeapi';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { colorsByType } from '../../utils/colorsByType';
import Alert from '../log/Alert';
import { pauseMusic, playMusic, chooseYou } from '../../actions/index';
import PokemonService from '../../services/PokemonService';


const SearchPokemon = ({thereIsUser, pauseMusic, playMusic, music, fight, chooseYou}) => {

    const [pokemonSearched, setPokemonSearched] = useState('');
    const [pokemonData, setPokemonData] = useState('');
    const [pokemonType, setPokemonType] = useState('');
    const [pokemonMove, setPokemonMove] = useState('');
    const [showError, setShowError] = useState(false);
    const [notPrevious, setNotPrevious] = useState(false)

    useEffect(() => {
        const getPokemon = async () => {
            pokeapi.get(`/pokemon/${pokemonSearched}`).then(response => {
                setShowError(false);
                const {data} = response;
                setPokemonData(data);
                if (pokemonData) {
                    setPokemonType(data.types[0].type.name);
                    setPokemonMove(data.moves[4].move.name);
                }      
            }).catch(err => {
                console.log("err", err);
                setShowError(true);
                return;
            });   
        }
            const getPokemonTimeOut = setTimeout(() => {
                if (pokemonSearched) {                  
                    getPokemon();
                }
            }, 500);
    
            return () => {
                clearTimeout(getPokemonTimeOut);
            }
    }, [pokemonSearched, pokemonData]);

    useEffect(() => {
        setNotPrevious(false);
    }, [pokemonSearched])
    

    const POKEMON = pokemonData?.name?.charAt(0).toUpperCase() + pokemonData?.name?.slice(1);
    const DESCRIPTION = `${POKEMON} is a ${pokemonType} type pokemon and his favorite move is ${pokemonMove}`;

    const handleClick = (text) => {
        const audio = document.getElementById('music');

        const listenDescription = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            if(music) {
                utterance.onend = () => {
                    audio.play();
                    playMusic();
                }
            }
            audio.pause();
            pauseMusic();
            
            speechSynthesis.speak(utterance);    
        }
        listenDescription();  
    }

    const iChooseYouButton = () => {
        chooseYou(pokemonData);
        history.push('/fight')
    }

    const prevPokemon = async () => {
        if(pokemonData.id === 1) {
            setNotPrevious(true);
        }
        else {
            const pokemonService = new PokemonService();
            const {data} = await pokemonService.getPrevCardPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id - 1}`);
            setPokemonSearched(data.name);
            setPokemonData(data);
        }
    }

    const nextPokemon = async () => {
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getNextCardPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id + 1}`);
        setPokemonSearched(data.name);
        setPokemonData(data);
        
    }

    const renderPokemon = () => {
        if (pokemonData) {
            return (
                <>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Button 
                            style={{width: '4rem', marginBottom: '2%', marginRight: '0.5%'}}
                            variant='info'
                            onClick={prevPokemon}
                        >
                            Prev
                        </Button>
                        <Button 
                            style={{width: '10rem', marginBottom: '2%'}} 
                            onClick={iChooseYouButton}
                        >
                            I choose you!
                        </Button>
                        <Button 
                            style={{width: '4rem', marginBottom: '2%', marginLeft: '0.5%'}}
                            variant='info'
                            onClick={nextPokemon}
                        >
                            Next
                        </Button>
                    </div>
                    <div className="pokemonFile">
                        
                        <Card className="searchPokemon__card">
                            <div className="searchPokemon__pokemon">
                                <Card.Img 
                                    className="searchPokemon__img"
                                    variant="top" 
                                    src={pokemonData.sprites?.other['official-artwork']?.front_default} 
                                />

                                <Card.Body>
                                    <Card.Title className="pokemonFile__title">{POKEMON} #{pokemonData.id}</Card.Title>
                                    <hr />
                                    <Card.Text>
                                    {DESCRIPTION}
                                    </Card.Text>
                                </Card.Body>
                            </div>
                            

                            <Button 
                            onClick={() => handleClick(DESCRIPTION)}
                            >
                                Listen
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-volume-up-fill" viewBox="0 0 16 16" style={{margin: '5px'}}>
                                    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                                    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                                    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                                </svg>
                            </Button>

                            <ListGroup className="list-group-flush pokemonFile__info">
                                <ListGroupItem>
                                Type: <strong style={{color: colorsByType[pokemonType]}}>{pokemonType}</strong>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </div>    
                </>    
            );
        }
    }
    

    return ( 
        <>
            {!thereIsUser 
            ? <Alert />
            : (
                <div className="searchPokemon">
                    <div className="searchPokemon__button">
                        <Button 
                            variant="info" 
                            onClick={()=>history.push('/')}
                        >
                            Return to home
                        </Button>
                    </div>
           
                    <div className="input">
                        <div className="input-group mb-3">
                            <input 
                                style={{display: 'flex'}}
                                onChange={(e) => setPokemonSearched(e.target.value.toLowerCase())}
                                type="text" 
                                className="form-control" 
                                placeholder="Enter Pokemon name or Pokemon number" 
                                aria-label="Recipient's username" 
                                aria-describedby="button-addon2" 
                            />
                        </div>
                    </div>
                    {showError && <p className="noMatch">There are no Pokemon that match your search</p>}
                    {notPrevious && <p className="noMatch">Bulbasaur is the first Pokemon. There are no previous Pokemons</p>}
                    {!pokemonData 
                    ? <img 
                        src="/assets/img/pikachusleeping.png" 
                        alt="pikachu" 
                        style={{width: '350px', marginTop: '5%'}} 
                    />
                    : renderPokemon()}
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return { 
        
        thereIsUser: state.login.user,
        music: state.music.volume,
        fight: state.fight.pokemon
    }
}

export default connect(mapStateToProps, {playMusic, pauseMusic, chooseYou})(SearchPokemon);