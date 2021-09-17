import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const authContext = useContext(AuthContext);

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            authContext.user ?
                <Component {...props} />
                : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;