import React, { useState } from 'react';
import '../../styles/login.css';
import { connect } from 'react-redux';
import { signIn } from '../../actions/index';
import history from '../../history';
import { Button, FormControl, InputGroup, Alert, Form } from 'react-bootstrap';

const HARDCODED_PASSWORD = "testeo123";

const Login = ({signIn}) => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [invalidInputWarning, setInvalidInputWarning] = useState(false);

    const [showWarningTextForUser, setShowWarningTextForUser] = useState('none');
    const [showWarningTextForPassword, setShowWarningTextForPassword] = useState('none');

    const [warningTextForUser, setWarningTextForUser] = useState('');
    const [warningTextForPassword, setWarningTextForPassword] = useState('');
    

    const [showAlert, setShowAlert] = useState('none');
    const [buttonDisabled, setButtonDisabled] = useState(false);


    const onSignInClick = () => {
        signIn(user);
    }

    const validateLogin = () => {
        if(password === HARDCODED_PASSWORD && user.length >= 4) {
            setShowAlert('flex');
            setInvalidInputWarning(false);
            setShowWarningTextForPassword('none');
            setButtonDisabled(true);
            onSignInClick();

            setTimeout(()=> {
                history.push('/');
            }, 800);
        }

        if(password !== HARDCODED_PASSWORD && user.length >= 4) {
            setShowWarningTextForUser('none');
            setShowWarningTextForPassword('flex');
            setWarningTextForPassword('Password is incorrect. Try again.');
        }

        if(user.length >= 4) {
            setShowWarningTextForUser('none');
        } 

        else {
            setShowWarningTextForUser('flex');
            setInvalidInputWarning(true);

            if(user.length === 0) {
                setWarningTextForUser('Please, complete this area');
            }

            if(password.length === 0) {
                setWarningTextForPassword('Please, complete this area');
            }

            if(user.length === 0 && password.length === 0) {
                setWarningTextForUser('Please, complete this area');
                setWarningTextForPassword('Please, complete this area');
                setShowWarningTextForPassword('flex');
            }

            if(user.length > 0 && user.length < 4) {
                setWarningTextForUser('Enter a username with a min 4 characters');
            }

            if(password !== HARDCODED_PASSWORD && password.length > 0) {
                setShowWarningTextForPassword('flex');
                setWarningTextForPassword('Password is incorrect. Try again.');
            }

            if(user.length >= 4) {
                setShowWarningTextForUser('none');
            } 
        }
    }

    const login = (e) => {
        e.preventDefault();
        validateLogin();
    }


    return ( 
        <>
            <div className="login">
                <Form>
                    <img src="/assets/img/pokeball.png" alt="login" className="image" />
                    <Form.Label className="login__title">
                        <h4>Sign in</h4>
                    </Form.Label>

                    <InputGroup className="mb-2" hasValidation>
                        <FormControl 
                            placeholder="Username" 
                            required 
                            value={user} 
                            onChange={e => setUser(e.target.value)}
                            isInvalid={invalidInputWarning}
                        />
                        <Form.Control.Feedback 
                            type="invalid" 
                            style={{display: showWarningTextForUser, justifyContent: 'center' }}
                        >
                            {warningTextForUser}
                        </Form.Control.Feedback>
                    </InputGroup>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            required 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            isInvalid={invalidInputWarning}    
                        />
                        
                        <Form.Control.Feedback 
                            type="invalid" 
                            style={{display: showWarningTextForPassword, justifyContent: 'center' }}
                        >
                            {warningTextForPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={login} 
                        disabled={buttonDisabled}
                    >
                        Sign in!
                    </Button>
                    <Alert 
                        variant="success" 
                        style={{display: showAlert, margin: '10px', justifyContent: 'center' }}
                    >
                        Access granted!
                    </Alert>
                </Form>
            </div>
        </>
    );
}
 
const mapStateToProps = (state) => {
    return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signIn })(Login);