import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { user } = useSelector(({ userLogin }) => userLogin);
    return (
        <Container>
            <h1>Welcome back, {user?.profile?.firstName} {user?.profile?.lastName}.</h1>
        </Container>
    );
};

export default Dashboard;
