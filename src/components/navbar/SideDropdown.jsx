import '../../styles/sideDropdown.css';
import { connect } from 'react-redux';
import history from '../../history';
import { Dropdown, DropdownButton } from 'react-bootstrap';


const SideDropdown = ({user}) => {
    return ( 
        <div className="sideDropdown">
            <div className="sideDropdown__userName">{`Catch them, ${user}!`}
                <img src="/assets/img/pokeballOpen.png" alt="pokeball" height="20px" width="20px"/>
            </div>
            <DropdownButton title="POKEDEX " className="sideDropdown__item">
                <Dropdown.Item onClick={()=> history.push('/search')}>Search Pokemon</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={()=> history.push('/all')}>See all Pokemons</Dropdown.Item>       
            </DropdownButton>
        </div>   
    );
}
 
const mapStateToProps = (state) => {
    return { user: state.login.user }
}

export default connect(mapStateToProps)(SideDropdown);