import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/showAllPokemons.css';
import { Button, Spinner } from 'react-bootstrap';
import pokeapi from '../../utils/pokeapi';
import PokemonService from '../../services/PokemonService';
import history from '../../history';
import EachPoke from './EachPoke';
import FilterButton from './FilterButton';
import Alert from '../log/Alert';

const ShowAllPokemons = ({ thereIsUser }) => {

    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [optionSelected, setOptionSelected] = useState('');

    useEffect(() => {
        
        const getAllPokemons = async () => {
            const {data} = await pokeapi.get(`/pokemon/`);
            await loadPokemons(data.results);    
            
            setNextUrl(data.next);
            setLoading(false);
        }
        getAllPokemons()
    }, [optionSelected]);

    useEffect(() => {
        const getTypePokemon = async () => {
            setLoading(true)
            const {data} = await pokeapi.get(`/type/${optionSelected}/`);
            await loadPokemons(data.pokemon); 
            setLoading(false);
        }
        getTypePokemon();        
    }, [optionSelected]);


    const loadPokemons = async (pokemonList) => {
        let _pokemonData = await Promise.all(pokemonList.map(async pokemon => {
        const url = pokemon.url || pokemon.pokemon.url;
        let pokemonRecord = await getPokemon(url);
        return pokemonRecord;
        }));
        setPokemonData(_pokemonData);
    }

    const getPokemon = async (url) => {
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(url);
        return data;
    }

    const nextPokemonList = async () => {
        setLoading(true);
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getNextPokemons(nextUrl);
        await loadPokemons(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prevPokemonList = async () => {
        if(!prevUrl) return;
        setLoading(true);
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getPrevPokemons(prevUrl);
        await loadPokemons(data.results);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const showButtons = () => {
        if(optionSelected) {
            return (
                <Button variant="primary" onClick={() => setOptionSelected(false)}>Go Back</Button>
            )
        }
        else {
            return (
                <>
                    <Button variant="primary" onClick={()=>history.push('/')}>Return to play</Button>
                    <Button variant="info" onClick={prevPokemonList}>Prev</Button>
                    <Button variant="info" onClick={nextPokemonList}>Next</Button>
                </>
                
            );
        }
    }
    

    return ( 

        <>
            {!thereIsUser 
                ? <Alert />
                : (
                    <div>
                        { loading 
                            ? <div className="spinner"><Spinner animation="border" variant="danger" /></div>
                            : (
                                <div className="showAllPokemons">
                                    <div className="showAllPokemons__buttons">
                                        {showButtons()}
                                        <FilterButton setOptionSelected={setOptionSelected} />
                                    </div>
                                    <div>
                                        {pokemonData.map((pokemon, i) => (
                                            <EachPoke pokemon={pokemon} key={i} />
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </> 
    );
}

const mapStateToProps = (state) => {
    return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, null)(ShowAllPokemons);