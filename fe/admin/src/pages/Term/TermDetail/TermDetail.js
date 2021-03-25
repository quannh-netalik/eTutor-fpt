import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Loader from '../../../components/common/Loader';
import Message from '../../../components/common/Message';
import FormContainer from '../../../components/common/FormContainer';

import { Button, Col, Form, Row, Image } from 'react-bootstrap';
import { AWS_FOLDER } from '../../../config';
import { getTerm, updateTermAction } from '../../../actions/term.action';
import { LinkContainer } from 'react-router-bootstrap';
import { TERM_DETAIL_RESET } from '../../../constants/term.constant';

const FacultyDetail = ({ history, match }) => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const { loading, error, term } = useSelector(({ termDetail }) => termDetail);

    const { loading: updateLoading, error: updateError } = useSelector(({ updateFaculty }) => updateFaculty);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        // if did not exist in redux or the request id is different with the one in redux
        if (!term?.name || term._id !== match.params.id) {
            dispatch(getTerm(match.params.id));
        } else {
            setName(term.name);
            setDescription(term.description);
            setStartDate(moment(term.startDate).format('YYYY-MM-DD'));
            setEndDate(moment(term.endDate).format('YYYY-MM-DD'));
            setStatus(term.isActive);
        }
    }, [dispatch, term, match]);

    const onUpdateHandler = (e) => {
        e.preventDefault();
        dispatch(updateTermAction({
            id: term._id,
            body: {
                name,
                description,
                startDate,
                endDate,
                isActive: status,
            }
        }));
        setMessage('Update successful');

        setTimeout(() => {
            dispatch({ type: TERM_DETAIL_RESET });
            history.push('/term');
        }, 1200);
    };
    return (
        <FormContainer md={12}>
            <h1>Update Term</h1>
            {(error || updateError) && <Message variant="danger">{error || updateError}</Message>}
            {(loading || updateLoading) && <Loader />}
            {message && <Message variant="info">{message}</Message>}
            <Row>
                <Col md={8}>
                    <Form onSubmit={onUpdateHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Label>Term Status</Form.Label>
                            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option key="active" value={true}>Active</option>
                                <option key="suspense" value={false}>Suspense</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="createdAt">
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={term?.createdAt || ''}
                                disabled={true}
                            ></Form.Control>
                        </Form.Group>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <LinkContainer to="/term">
                                <Button type="submit" variant="light">Back</Button>
                            </LinkContainer>

                            <Button type="submit" variant="dark">Update</Button>
                        </div>
                    </Form>
                </Col>
                <Col>
                    <Row className="justify-content-center">
                        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
                            <strong>Created By</strong>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <Image src={`${AWS_FOLDER.IMAGE}${term?.createdBy?.profile?.avatar}`} rounded fluid />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div>
                            <strong>
                                {term?.createdBy?.profile?.firstName} {term?.createdBy?.profile?.lastName}
                            </strong>
                        </div>
                    </Row>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default FacultyDetail;
