import React from 'react';
import { Col, Row } from 'react-bootstrap';

const FacultyInfo = ({ faculty }) => {
    return (
        <>
            <h2>Faculty</h2>
            <Row className="py-2">
                <Col md={4}>
                    <strong>Name: </strong>
                </Col>
                <Col>
                    <div>{faculty?.name}</div>
                </Col>
            </Row>
            <Row className="py-2">
                <Col md={4}>
                    <strong>Status: </strong>
                </Col>
                <Col>
                    {
                        faculty?.isDeleted ? (
                            <div style={{ color: 'red', fontWeight: '800' }}>Deleted</div>
                        ) : faculty?.isActive ? (
                            <span className="badge badge-success shadow-success m-1 rounded py-2 px-2">Active</span>
                        ) : (
                            <span className="badge badge-danger shadow-danger m-1 rounded py-2 px-2">Suspended</span>
                        )
                    }
                </Col>
            </Row>
        </>
    );
};

export default FacultyInfo;
