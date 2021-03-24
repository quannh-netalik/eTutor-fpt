import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../components/common/Loader';
import Message from '../../../components/common/Message';
import FormContainer from '../../../components/common/FormContainer';

import { getFaculty, updateFacultyAction } from '../../../actions/faculty.action';
import { Button, Col, Form, Row, Image } from 'react-bootstrap';
import { FACULTY_DETAIL_RESET } from '../../../constants/faculty.constant';
import { AWS_FOLDER } from '../../../config';
import { LinkContainer } from 'react-router-bootstrap';

const FacultyDetail = ({ history, match }) => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const { loading, error, faculty } = useSelector(({ facultyDetail }) => facultyDetail);
    const { loading: updateLoading, error: updateError } = useSelector(({ updateFaculty }) => updateFaculty);

    const [name, setName] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        // if did not exist in redux or the request id is different with the one in redux
        if (!faculty?.name || faculty._id !== match.params.id) {
            dispatch(getFaculty(match.params.id));
        } else {
            setName(faculty?.name);
            setStatus(faculty?.isActive);
        }
    }, [dispatch, faculty, match]);

    const onUpdateHandler = (e) => {
        e.preventDefault();
        dispatch(updateFacultyAction({
            id: faculty._id,
            body: {
                name,
                isActive: status,
            }
        }));
        setMessage('Update successful');

        setTimeout(() => {
            dispatch({ type: FACULTY_DETAIL_RESET });
            history.push('/faculty');
        }, 1200);
    };
    return (
        <FormContainer md={8}>
            <h1>Update Faculty</h1>
            {(error || updateError) && <Message variant="danger">{error || updateError}</Message>}
            {(loading || updateLoading) && <Loader />}
            {message && <Message variant="info">{message}</Message>}
            <Row>
                <Col md={8}>
                    <Form onSubmit={onUpdateHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name || ''}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Label>Faculty Status</Form.Label>
                            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option key="active" value={true}>Active</option>
                                <option key="suspense" value={false}>Suspense</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="createdAt">
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={faculty?.createdAt || ''}
                                disabled={true}
                            ></Form.Control>
                        </Form.Group>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <LinkContainer to="/faculty">
                                <Button type="submit" variant="light">Back</Button>
                            </LinkContainer>

                            <Button type="submit" variant="dark">Update</Button>
                        </div>
                    </Form>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Image src={`${AWS_FOLDER.IMAGE}${faculty?.createdBy?.profile?.avatar}`} rounded fluid />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div>
                            <strong>
                                {faculty?.createdBy?.profile?.firstName} {faculty?.createdBy?.profile?.lastName}
                            </strong>
                        </div>
                    </Row>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default FacultyDetail;
