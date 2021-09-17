import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createUser } from "../../utilities/auth";
import logo from '../../logo.png';
import './RegisterForm.css';

const RegisterForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const history = useHistory();

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "name":
                setName(e.target.value)
                break;
            case "email":
                setEmail(e.target.value)
                break;
            case "password":
                setPassWord(e.target.value);
                break;
            case "confirmPass":
                setConfirmPass(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleFormSubmit = (e) => {
        createUser(name, email, password);
        history.push("/signin");
    };

    return (
        <form className="formStyle" onSubmit={(e) => handleFormSubmit(e)}>

            <img
                onClick={() => history.push('/')}
                id="header__logo"
                src={logo}
                alt="amazon_clone"
            />

            <div>
                <input
                    maxLength="35"
                    id="inputStyle"
                    name="name"
                    type="text"
                    placeholder="First Name"
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
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
                    maxLength="18"
                    id="inputStyle"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div>
                <input
                    maxLength="18"
                    id="inputStyle"
                    name="confirmPass"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
            <div>
                <br />
                <button
                    disabled={!(email !== "" && email !== "" && confirmPass === password)}
                    id="buttonStyle"
                    type="submit"
                >
                    Register
                </button>
            </div>
            <div>
                <br />
                <p>Already have an account? <Link to="/signin">Sign in</Link>.</p>
            </div>
        </form>
    );
}

export default RegisterForm;