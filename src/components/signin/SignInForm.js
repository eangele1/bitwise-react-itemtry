import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { useHistory, Link } from 'react-router-dom';
import logo from '../../logo.png';

let header__logo = {
    width: "200px",
    margin: "auto",
    cursor: "pointer",
};

const SignInForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");

    const { dispatchUserEvent } = useContext(AuthContext);
    const history = useHistory();

    const handleUserLogin = () => {
        const user = {
            email: email,
            password: password
        };

        return dispatchUserEvent('LOGIN', { user: user });
    }

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value)
                break;
            case "password":
                setPassWord(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleFormSubmit = (e) => {
        if(handleUserLogin()){
            history.push("/");
        }
    };

    return (
        <form className="formStyle" onSubmit={(e) => handleFormSubmit(e)}>
            <img
                onClick={() => history.push('/')}
                style={header__logo}
                src={logo}
                alt="amazon_clone"
            />
            <div>
                <input
                    id="inputStyle"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div>
                <input
                    id="inputStyle"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div>
                <br />
                <button id="buttonStyle" type="submit">Sign In</button>
            </div>
            <div>
                <br />
                <p>Don't have an account? <Link to="/register">Register</Link>.</p>
            </div>
        </form>
    );
}

export default SignInForm;