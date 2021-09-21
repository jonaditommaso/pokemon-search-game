import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import pokeapi from '../../utils/pokeapi';
import '../../styles/fight.css';
import FightsData from './FightsData';
import Bar from './Bar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { thereBattle, musicBattlePause } from '../../actions';
import { colorsByType } from '../../utils/colorsByType';

const Fighter = ({fighter, thereBattle, musicBattlePause}) => {

    const [pokemonData, setPokemonData] = useState('');
    const [opponentSkills, setOpponentSkills] = useState('');
    const [skills, setSkills] = useState('')
    const [ownSkills, setOwnSkills] = useState('');

    const [opponentPunched, setOpponentPunched] = useState('');
    const [iWasPunched, setIWasPunched] = useState('')

    const [pointsOfDamageTowardsMe, setPointsOfDamageTowardsMe] = useState(0);

    const [damagePointsForTheOpponent, setDamagePointsForTheOpponent] = useState(0);
    const [winner, setWinner] = useState('d-none');

    const [iWin, setIWin] = useState(false);
    const [heWin, setHeWin] = useState(false);

    const [opponentsTurn, setOpponentsTurn] = useState(false);

    const [thereIsHit, setThereIsHit] = useState(false);

    const [opponentHp, setOpponentHp] = useState('');

    const OPPONENT = Math.round(Math.random()*100).toString(); 
    // podria multiplicar por 150 y setear opponent siempre y cuando el resultado no sea 132 (ditto tiene una sola habilidad)

    const [thereWinner, setThereWinner] = useState(false)

    useEffect(() => {
        let moves = [];
        let ownMoves = []

        async function getSkills() {
            if(opponentSkills[16]) {
                for (let i = 16; i < 20; i++) {
                    moves?.push(opponentSkills[i]);
                }
                return moves;
            }
            else {
                for (let i = 0; i < 4; i++) {
                    moves.push(opponentSkills[i]);
                }
                return moves;
            }
        }

        if(pokemonData) {
            getSkills();
            setSkills(moves);
            setOpponentHp(pokemonData?.stats[0]?.base_stat);
            setPointsOfDamageTowardsMe(pokemonData?.stats[1].base_stat);
            thereBattle(pokemonData);
        }
        
        async function getOwnSkills() {
            if(fighter?.pokemon?.moves[16]) {
                for (let i = 16; i < 20; i++) {
                    ownMoves.push(fighter?.pokemon?.moves[i]);
                }
                return ownMoves;
            }
            else {
                for (let i = 0; i < 4; i++) {
                    ownMoves.push(fighter?.pokemon?.moves[i]);
                }
                return ownMoves;
            }
        }

        if(fighter) {
            getOwnSkills();
        }
        setOwnSkills(ownMoves);
        
    }, [opponentSkills]);


    useEffect(() => {
        if(opponentsTurn === true) {
            if(iWin === 100) {
                setThereWinner(true)
            }
                
            setTimeout(() => {
                if(iWin === 100) {
                    setIWasPunched('');
                }
                else {
                    setIWasPunched('fighter');
                }
            }, 5000);
            
            
            setTimeout(() => {
                setIWasPunched('');
                setOpponentsTurn(false);
            }, 5800);
        }
    }, [opponentsTurn, winner, iWin]);


    useEffect(() => {
        const getPokemon = async () => {
            const {data} = await pokeapi.get(`/pokemon/${OPPONENT}`);
                setPokemonData(data);
                setOpponentSkills(data?.moves);
        }
        getPokemon();

    }, []);

    const winName = () => {
        if(iWin >= 100) {
            return fighter?.pokemon?.name;
        }
        if(heWin >= 100) {
            return pokemonData?.name;
        }
    };

    return ( 
        <div>

            {/* OPPONENT */}
            <div className="fighter__opponent">
            {/* <div style={{display: 'inline', marginTop: '1.5%', marginRight: '0.5%'}}>
                    {pokemonData?.types.map((type, i) => (
                            <div 
                                key={i} 
                                style={{ backgroundColor: colorsByType[type.type.name]}}
                                className="fighter__type"
                            >
                                {type.type.name.toUpperCase()}
                            </div>
                    ))}
                </div> */}
                
                <div style={{display: 'flex', flexDirection: 'column'}} className="fightsData">
                    <div style={{display: 'flex', margin: '0'}}>
                        <Bar 
                            damage={damagePointsForTheOpponent} 
                            wins={setWinner} 
                            hisAccumulate={setIWin} 
                            hit={thereIsHit} 
                            setHit={setThereIsHit}
                            hp={opponentHp}
                            he
                            // winner={thereWinner}
                        />
                        {/* <p style={{  marginRight: '3px' }}>
                            <span style={{fontStyle: 'italic'}}>15 </span>HP
                        </p> */}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}} className="opponent">
                        <FightsData 
                            skills={skills} 
                            opponent={true} 
                            hePunchedMe={setIWasPunched}
                        />
                   </div>
                </div>
                    
                <div className={opponentPunched}>
                    <img 
                        src={pokemonData.sprites?.other?.dream_world?.front_default}
                        alt="opponent" 
                        className="fighter__img fighter__imgOpponent"
                        style={{height: '180px'}}
                    />
                </div>  
                
            </div>

            <div className={winner}>
                <span style={{margin: 'auto'}}>{winName()?.toUpperCase()} WINS</span>
                <div className="button__playAgain">
                    <Link to='/search'>
                        <Button onClick={() => musicBattlePause()}>PLAY AGAIN</Button>
                    </Link>
                </div>
                
            </div>

            {/* MYSELF */}
            <div className="fighter__myself">
                <div className={iWasPunched}>
                    <img 
                        // src={fighter?.pokemon.sprites?.back_default} 
                        src={fighter?.pokemon.sprites?.other?.dream_world?.front_default}
                        alt="fighter"
                        className="fighter__img fighter__imgMyself"
                    />
                </div>
                
                <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '23px'}}>

                    <div style={{display: 'flex', flexDirection: 'column'}} className="fightsData">
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <FightsData 
                                skills={ownSkills} 
                                opponentDamage={setDamagePointsForTheOpponent} 
                                punched={setOpponentPunched}
                                finish={winner}
                                hit={setThereIsHit}
                                attack={fighter?.pokemon.stats[1].base_stat}
                                turn={setOpponentsTurn}
                                hisTurn={opponentsTurn}
                            />
                            
                        </div>
                        

                        <div style={{display: 'flex'}}>
                            <Bar 
                                damageMe={pointsOfDamageTowardsMe} 
                                myAccumulate={setHeWin} 
                                punchMe={opponentsTurn}
                                wins={setWinner}
                                me
                                dontmodifybar={iWin}
                                winner={thereWinner}
                            />
                            {/* <p style={{paddingBottom: '3px', marginRight: '3px'}}>
                                <span style={{fontStyle: 'italic'}}>15 </span>HP
                            </p> */}
                        </div>
                        
                    </div>
                    {/* <div style={{display: 'flex', flexDirection: 'column', marginBottom: '3%', marginLeft: '1%'}}>
                        {fighter?.pokemon.types.map((type, i) => (
                            <div 
                                key={i}
                                className="fighter__type" 
                                style={{backgroundColor: colorsByType[type.type.name], flexDirection: 'column'}}
                            >
                                {type.type.name.toUpperCase()}
                            </div>
                        ))}
                    </div> */}
                </div>
                
            </div>
            
        </div>
    );
}

const mapStateToProps = (state) => {
    return { 
        fighter: state.fight,
        battle: state.battle
    }
}
 
export default connect(mapStateToProps, { thereBattle, musicBattlePause })(Fighter);