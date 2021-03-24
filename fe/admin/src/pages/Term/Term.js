import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import { formatDate } from '../../utils';
import { LinkContainer } from 'react-router-bootstrap';

import { createTermAction, getListTerm } from '../../actions/term.action';

const Term = () => {
    const [newTermName, setNewTermName] = useState('');
    const [newTermDescription, setNewTermDescription] = useState('');
    const [newTermStartDate, setNewTermStartDate] = useState('');
    const [newTermEndDate, setNewTermEndDate] = useState('');

    const [createMessage, setCreateMessage] = useState('');
    const [showCreateModal, setCrateShow] = useState(false);

    const dispatch = useDispatch();
    const { loading: loadingList, error: errorList, terms } = useSelector(({ listTerm }) => listTerm);
    const { loading: loadingCreate, error: errorCreate } = useSelector(({ crateTerm }) => crateTerm);

    useEffect(() => {
        dispatch(getListTerm());
    }, [dispatch, loadingCreate]);

    const resetField = () => {
        setNewTermName('');
        setNewTermDescription('');
        setNewTermStartDate('');
        setNewTermEndDate('');
        setCreateMessage('');
        setCrateShow(false);
    };

    const createTermHandler = (e) => {
        e.preventDefault();
        dispatch(createTermAction({
            name: newTermName,
            description: newTermDescription,
            startDate: newTermStartDate,
            endDate: newTermEndDate,
        }));
        setCreateMessage('Create new term successful');
        setTimeout(() => {
            resetField();
        }, 1000);
    };

    return (
        <Container>
            <h1>List term</h1>
            <Button
                type="submit"
                variant="success"
                style={{ display: 'flex', marginLeft: 'auto' }}
                onClick={() => setCrateShow(true)}
            >
                New term
            </Button>

            <Modal show={showCreateModal} onHide={resetField}>
                <Form onSubmit={createTermHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Term</Modal.Title>
                    </Modal.Header>
                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                    {createMessage && <Message variant="success">{createMessage}</Message>}
                    <Modal.Body>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={newTermName || ''}
                                onChange={(e) => setNewTermName(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                type="text"
                                placeholder="Enter description"
                                value={newTermDescription || ''}
                                onChange={(e) => setNewTermDescription(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Pick start date"
                                value={newTermStartDate || ''}
                                onChange={(e) => setNewTermStartDate(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="endDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Pick end date"
                                value={newTermEndDate || ''}
                                onChange={(e) => setNewTermEndDate(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={resetField}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Create new
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <br />

            {errorList && <Message variant="danger">{errorList}</Message>}
            {loadingList && <Loader />}
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {terms && terms.map((term, index) => (
                        <tr key={term._id}>
                            <td>{index + 1}</td>
                            <td>{term.name}</td>
                            <td>{term.createdBy.profile.firstName} {term.createdBy.profile.lastName}</td>
                            <td>{formatDate(term.startDate)}</td>
                            <td>{formatDate(term.endDate)}</td>
                            <td style={{ fontSize: '20px' }}>
                                {term.isActive ? <i className="fas fa-check" style={{ color: 'green' }}></i> : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                            </td>
                            <td>
                                <LinkContainer to={`/term/detail/${term._id}`}>
                                    <Button type="submit" variant="primary" className="btn-sm">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Term;
