import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../actions/user.action';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            dispatch(logoutAction());
            history.push('/login');
        }
    }, [history, dispatch]);

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
};

export default PrivateRoute;
