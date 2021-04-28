import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import StateLogin from '../log/StateLogin';
import SideDropdown from './SideDropdown';


const Navbar = ({thereIsUser}) => {

    const [showSideDropDown, setShowSideDropDown] = useState(false);

    useEffect(() => {
        if(thereIsUser && !showSideDropDown) {
            setTimeout(() => {
                setShowSideDropDown(true);
            }, 1000);
        }

    }, [thereIsUser, showSideDropDown])

    const showMenu = () => {
        return (
            thereIsUser && showSideDropDown && <SideDropdown />
        )
    }

    return ( 
        <div className="navbar">
            <StateLogin />
            {showMenu()}
        </div>    
    );
}

const mapStateToProps = (state) => {
    return { thereIsUser: state.login.user } 
}

export default connect(mapStateToProps, null)(Navbar);