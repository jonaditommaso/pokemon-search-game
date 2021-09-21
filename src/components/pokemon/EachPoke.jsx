import '../../styles/eachPoke.css';
import { colorsByType } from '../../utils/colorsByType';

const EachPoke = ({pokemon}) => {
    return (  
        <div className="eachPoke">
            <div className="eachPoke__File">
                <img 
                    src={pokemon.sprites?.other?.dream_world?.front_default} 
                    alt={pokemon.name} 
                    className="eachPoke__img"
                />
                <div>
                    <h6>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h6>
                    <p className="eachPoke__id">
                        {`#${pokemon.id}`}
                    </p>
                </div>
            </div>
           
            
            <div className="eachPoke__description">
                <div className="eachPoke__types">
                    {pokemon.types.map((type, i) => (
                        <div 
                            key={i}
                            className="eachPoke__type" 
                            style={{backgroundColor: colorsByType[type.type.name]}}
                        >
                            {type.type.name}
                        </div>
                    ))}
                </div>
                <p className="eachPoke__abilities">
                    Ability: {pokemon.abilities[0].ability.name}
                </p>
                <p  className="eachPoke__abilities">
                    Weight: <span style={{color: '#d98218'}}>{pokemon.weight}</span>
                </p>
            </div>
            <div className="eachPoke__attackDefense"> 
                <div>
                    <p style={{margin: '0', fontStyle: 'italic'}}>Attack</p>
                    <span style={{color: 'red'}}>{pokemon.stats[1].base_stat}</span>
                </div>
                <hr style={{margin: '0'}} />
                <div>
                    <p style={{margin: '0', fontStyle: 'italic'}}>Defense</p>
                    <span style={{color: '#0052c7'}}>{pokemon.stats[2].base_stat}</span>
                </div>
            </div>

            
        </div>    
    );
}
 
export default EachPoke;