import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import { createFacultyAction, deleteFacultyAction } from '../../actions/faculty.action';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import { formatDate } from '../../utils';
import { LinkContainer } from 'react-router-bootstrap';
import { getUserListAction } from '../../actions/user.action';


const User = () => {
    const [newFacultyName, setNewFacultyName] = useState('');
    const [createMessage, setCreateMessage] = useState('');
    const [showCreateModal, setCrateShow] = useState(false);

    const dispatch = useDispatch();
    const { loading: loadingList, error: errorList, faculties } = useSelector(({ listFaculty }) => listFaculty);
    const { loading: loadingCreate, error: errorCreate } = useSelector(({ crateFaculty }) => crateFaculty);
    const { loading: loadingDelete, error: errorDelete } = useSelector(({ deleteFaculty }) => deleteFaculty);

    useEffect(() => {
        console.log('hello?');
        dispatch(getUserListAction());
    }, [dispatch, loadingCreate, loadingDelete]);

    const resetField = () => {
        setNewFacultyName('');
        setCreateMessage('');
        setCrateShow(false);
    };

    const createFacultyHandler = (e) => {
        e.preventDefault();
        dispatch(createFacultyAction({ name: newFacultyName }));
        setCreateMessage('Create new faculty successful');
        setTimeout(() => {
            resetField();
        }, 1000);
    };

    const onDeleteHandler = (facultyId) => {
        dispatch(deleteFacultyAction(facultyId));
    };

    return (
        <Container>
            <h1>List User</h1>
            <Button
                type="submit"
                variant="success"
                style={{ display: 'flex', marginLeft: 'auto' }}
                onClick={() => setCrateShow(true)}
            >
                New User
            </Button>

            <Modal show={showCreateModal} onHide={resetField}>
                <Form onSubmit={createFacultyHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                    {createMessage && <Message variant="success">{createMessage}</Message>}
                    <Modal.Body>
                        <Form.Group controlId="name">
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={newFacultyName || ''}
                                onChange={(e) => setNewFacultyName(e.target.value)}
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
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {(loadingList || loadingDelete) && <Loader />}
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties && faculties.map((faculty, index) => (
                        <tr key={faculty._id}>
                            <td>{index + 1}</td>
                            <td>{faculty.name}</td>
                            <td>{faculty.createdBy.profile.firstName} {faculty.createdBy.profile.lastName}</td>
                            <td>{formatDate(faculty.createdAt)}</td>
                            <td style={{ fontSize: '20px' }}>
                                {faculty.isActive ? <i className="fas fa-check" style={{ color: 'green' }}></i> : <i className="fas fa-times" style={{ color: 'red' }}></i>}
                            </td>
                            <td>
                                <LinkContainer to={`/faculty/detail/${faculty._id}`}>
                                    <Button type="submit" variant="primary" className="btn-sm">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td>
                                <Button type="submit" variant="primary" className="btn-sm" onClick={() => onDeleteHandler(faculty._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default User;
