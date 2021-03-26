import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
    return (
        <footer style={{ paddingTop: '200px' }}>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Magazine
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
