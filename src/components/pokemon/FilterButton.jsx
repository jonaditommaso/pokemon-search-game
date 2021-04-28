import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import '../../styles/filterButton.css';

const FilterButton = ({setOptionSelected}) => {

    return ( 
        <>
            <DropdownButton 
                id="dropdown-basic-button" 
                title="Filter by type" 
                variant="info" 
                className="filterButton"
            >
                <Dropdown.Item onClick={() => setOptionSelected('normal')}>Normal</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('fire')}>Fire</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('water')}>Water</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('grass')}>Grass</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('electric')}>Electric</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('ground')}>Ground</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('bug')}>Bug</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('ghost')}>Ghost</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('psychic')}>Pyschic</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('poison')}>Poison</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('fairy')}>Fairy</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('rock')}>Rock</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('dark')}>Dark</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('steel')}>Steel</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('fighting')}>Fighting</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('ice')}>Ice</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('dragon')}>Dragon</Dropdown.Item>
                <Dropdown.Item onClick={() => setOptionSelected('flying')}>Flying</Dropdown.Item>
            </DropdownButton>
        </>  
    );
}
 
export default FilterButton;