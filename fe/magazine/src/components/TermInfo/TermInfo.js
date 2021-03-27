import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { formatDate } from '../../utils';

const TermInfo = ({ isSelectTermList, termList, handleChangeTerm, currentTerm }) => {
    return (
        <>
            <Row>
                <Col md={5}>
                    <h2>Term</h2>
                </Col>

                {isSelectTermList === true && (
                    <Col>
                        <Form.Group controlId="terms" style={{ maxWidth: '120px' }}>
                            <Form.Control
                                as="select"
                                onChange={handleChangeTerm}
                            >
                                {termList.length && termList.map((term) => (
                                    <option key={term.name} value={term._id}>{term.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                )}
            </Row>
            <Row className="py-2">
                <Col md={5}>
                    <strong>Name: </strong>
                </Col>
                <Col>
                    <div>{currentTerm.name}</div>
                </Col>
            </Row>
            <Row className="py-2">
                <Col md={5}>
                    <strong>Description: </strong>
                </Col>
                <Col>
                    <div>{currentTerm.description}</div>
                </Col>
            </Row>
            <Row className="py-2">
                <Col md={5}>
                    <strong>Start Date: </strong>
                </Col>
                <Col>
                    <div>{formatDate(currentTerm.startDate)}</div>
                </Col>
            </Row>
            <Row className="py-2">
                <Col md={5}>
                    <strong>End Date: </strong>
                </Col>
                <Col>
                    <div>{formatDate(currentTerm.startDate)}</div>
                </Col>
            </Row>
            <Row className="py-2">
                <Col md={5}>
                    <strong>Status: </strong>
                </Col>
                <Col>
                    {currentTerm.isActive ? (
                        <span className="badge badge-success shadow-success m-1 rounded py-2 px-2">Active</span>
                    ) : (
                        <span className="badge badge-danger shadow-danger m-1 rounded py-2 px-2">Suspended</span>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default TermInfo;
