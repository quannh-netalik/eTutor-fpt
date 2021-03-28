import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../actions/user.action';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector(({ userLogin }) => userLogin);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            dispatch(logoutAction());
            history.push('/login');
        }

        // validate role
        if (role) {
            if (role !== user.profile.role) {
                history.push('/login');
            }
        }
    }, [history, role, dispatch]);

    return (
        <Route {...rest} render={props => <Component {...props} />} />
    );
};

export default PrivateRoute;
