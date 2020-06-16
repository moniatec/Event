import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, path, token, exact, }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                token ? <Component {...props} token={token} /> : <Redirect to="/" />
            }
        />
    );
};

export const AuthRoute = ({ component: Component, path, token, exact }) => {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                token ? <Redirect to='/home' /> : <Component {...props} />
            }
        />
    );
};