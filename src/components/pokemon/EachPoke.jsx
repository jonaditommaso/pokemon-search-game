import '../../styles/eachPoke.css';
import { colorsByType } from '../../utils/colorsByType';

const EachPoke = ({pokemon}) => {
    return (  
        <div className="eachPoke">
            <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
            <div>
                <h6>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h6>
                <p className="eachPoke__id">
                    {`#${pokemon.id}`}
                </p>
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
            </div>
        </div>    
    );
}
 
export default EachPoke;