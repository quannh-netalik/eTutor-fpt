import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/common/FormContainer';
import { userLoginAction } from '../../actions/user.action';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';

const Login = ({ history }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    const { loading, error, user } = useSelector(({ userLogin }) => userLogin);

    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [user, history]);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(userLoginAction({ email, password }));
    };

    return (
        <FormContainer>
            <h1>Admin Login</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={loginHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        minLength={5}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">Sign in</Button>
            </Form>
        </FormContainer>
    );
};

export default Login;
