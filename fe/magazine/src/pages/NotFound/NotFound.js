import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center">
                <h1>NOT FOUND</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <p>There is nothing here, please go back where you from!</p>
            </div>
        </Container>
    );
};

export default NotFound;
