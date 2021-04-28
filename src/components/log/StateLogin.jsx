import React, { useState, useEffect } from 'react';
import '../../styles/stateLogin.css';
import { connect } from 'react-redux';
import history from '../../history';
import { signOut } from '../../actions/index';
import { Button } from 'react-bootstrap';


const StateLogin = ({thereIsUser, signOut}) => {

    const [buttonColor, setButtonColor] = useState('danger');

    useEffect(() => {
        if(thereIsUser) {
            setButtonColor('outline-danger');
        }
        else {
            setButtonColor('danger')
        }
    }, [thereIsUser]);

    const handleClick = () => {
        if(!thereIsUser) {
            history.push('/login');
        } 
        else {
            signOut();
            history.push('/');
        }
    }
    

    return ( 
        <div className="stateLogin">
            <Button 
                onClick={() => handleClick()}
                variant={buttonColor}
            >
                {!thereIsUser ? 'Sign In' : 'Sign Out'}
            </Button>
        </div>
    );
    
}
 
const mapStateToProps = (state) => {
    return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signOut })(StateLogin);