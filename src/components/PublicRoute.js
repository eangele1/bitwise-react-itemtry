import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

    const authContext = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            authContext.user && restricted ?
                <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;