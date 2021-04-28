import axios from 'axios';

export default class PokemonService {

    async getNextPokemons(nextUrl) {
        return await axios.get(nextUrl);
    }

    async getPrevPokemons(prevUrl) {
        return await axios.get(prevUrl);
    }

    async getUrlForEachPokemon(url) {
        return await axios.get(url);
    }
};