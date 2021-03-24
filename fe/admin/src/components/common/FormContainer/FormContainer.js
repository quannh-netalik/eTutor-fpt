import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const FormContainer = ({ children, md }) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={md}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

FormContainer.defaultProps = {
    md: 6,
};

export default FormContainer;
