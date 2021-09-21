import '../../styles/sideDropdown.css';
import { connect } from 'react-redux';
import history from '../../history';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import { noBattle, musicBattlePause } from '../../actions';

const SideDropdown = ({user, battle, noBattle, musicBattlePause}) => {
    

    useEffect(() => {
        // console.log('desde aca', battle.pokemon);
    }, [battle])

    const warning = (go) => {
        if(battle.pokemon === true) {
            Swal.fire({
                icon: 'warning',
                text: 'Are you sure you want to abandon the battle?',
                showConfirmButton: true,
                confirmButtonText: "Ok",
                confirmButtonColor: '#2754d5',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                backdrop: true
            })
                .then((result) => {
                    if ((result.value) && (go === 'search')) {
                        noBattle();
                        history.push('/search');
                        musicBattlePause();
                    }
                    if ((result.value) && (go === 'all')) {
                        noBattle();
                        history.push('/all');
                        musicBattlePause();
                    }
                }); 
        }
        else {
            if(go === 'search') {
                history.push('/search');
            }
            if(go === 'all') {
                history.push('/all');
            }
        }
    }

    
    return ( 
        <div className="sideDropdown">
            <div className="sideDropdown__userName">{`Catch them, ${user}!`}
                <img src="/assets/img/pokeballOpen.png" alt="pokeball" height="20px" width="20px"/>
            </div>
            <DropdownButton title="POKEDEX " className="sideDropdown__item">
                <Dropdown.Item onClick={() => warning('search')}>Search Pokemon</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => warning('all')}>See all Pokemons</Dropdown.Item>       
            </DropdownButton>
        </div>   
    );
}
 
const mapStateToProps = (state) => {
    return { 
        user: state.login.user, 
        battle: state.battle
    }
}

export default connect(mapStateToProps, { noBattle, musicBattlePause })(SideDropdown);