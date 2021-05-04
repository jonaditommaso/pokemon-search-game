import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import '../../styles/searchPokemon.css';
import pokeapi from '../../utils/pokeapi';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { colorsByType } from '../../utils/colorsByType';
import Alert from '../log/Alert';
// import { pauseMusic, playMusic } from '../../actions/index';


const SearchPokemon = ({thereIsUser, pauseMusic, playMusic, music}) => {

    const [pokemonSearched, setPokemonSearched] = useState('');
    const [pokemonData, setPokemonData] = useState('');
    const [pokemonType, setPokemonType] = useState('');
    const [pokemonMove, setPokemonMove] = useState('');
    const [showError, setShowError] = useState(false);

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

    const POKEMON = pokemonData?.name?.charAt(0).toUpperCase() + pokemonData?.name?.slice(1);
    const DESCRIPTION = `${POKEMON} is a ${pokemonType} type pokemon and his favorite move is ${pokemonMove}`;

    const listenDescription = (text)=> {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
    

    const renderPokemon = () => {
        if (pokemonData) {
            return (
                <div className="pokemonFile">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={pokemonData.sprites?.other['official-artwork']?.front_default} />

                        <Card.Body>
                            <Card.Title className="pokemonFile__title">{POKEMON} #{pokemonData.id}</Card.Title>
                            <Card.Text>
                            {DESCRIPTION}
                            </Card.Text>
                        </Card.Body>

                        <Button 
                         onClick={() => listenDescription(DESCRIPTION)}
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
                            variant="primary" 
                            onClick={()=>history.push('/')}
                        >
                            Return to play
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
                    {renderPokemon()}
                </div>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return { 
        thereIsUser: state.login.user
        // music: state.music.volume
    }
}

export default connect(mapStateToProps, null)(SearchPokemon);