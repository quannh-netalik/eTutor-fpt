import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form, Modal, Table, Row, Col } from 'react-bootstrap';
import { deleteFacultyAction, getListFaculty } from '../../actions/faculty.action';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import { formatDate } from '../../utils';
import { LinkContainer } from 'react-router-bootstrap';
import { createUserAction, getUserListAction } from '../../actions/user.action';


const User = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('admin');
    const [faculty, setFaculty] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [createMessage, setCreateMessage] = useState('');
    const [showCreateModal, setCrateShow] = useState(false);

    const dispatch = useDispatch();
    const { loading: loadingListFaculty, error: errorList, faculties } = useSelector(({ listFaculty }) => listFaculty);
    const { loading: loadingUserList, users } = useSelector(({ userList }) => userList);
    const { loading: loadingCreate, error: errorCreate } = useSelector(({ userCreate }) => userCreate);
    const { loading: loadingDelete, error: errorDelete } = useSelector(({ deleteFaculty }) => deleteFaculty);

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setCreateMessage('Create new user successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }

    }, [loadingCreate, errorCreate, loadingDelete]);

    useEffect(() => {
        if (loadingUserList) {
            dispatch(getUserListAction());
        }
    }, [dispatch, loadingUserList]);

    useEffect(() => {
        if (!loadingListFaculty) {
            setFaculty(faculties[0]?._id);
        }
    }, [loadingListFaculty, faculties]);

    const resetField = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setFaculty('');
        setCity('');
        setAddress('');
        setPhone('');
        setCreateMessage('');
        setCrateShow(false);
    };

    const openCreateModal = () => {
        dispatch(getListFaculty({
            isActive: true,
        }));
        setCrateShow(true);
    };

    const createUserHandler = (e) => {
        e.preventDefault();
        setCreateMessage('');

        if (password !== confirmPassword) {
            setCreateMessage('invalid password');
            return;
        } else {
            dispatch(createUserAction({
                email,
                password,
                profile: {
                    firstName,
                    lastName,
                    role,
                    address,
                    city,
                    phone,
                    faculty,
                },
            }));
        }
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
                onClick={openCreateModal}
            >
                New User
            </Button>

            <Modal show={showCreateModal} onHide={resetField}>
                <Form onSubmit={createUserHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>New User</Modal.Title>
                    </Modal.Header>
                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
                    {createMessage && <Message variant="info">{createMessage}</Message>}
                    <Modal.Body>
                        <Form.Group controlId="email">
                            <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required={true}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required={true}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="status">
                            <Form.Label>Role <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option key="admin" value='admin'>Admin</option>
                                <option key="manager" value='manager'>Manager</option>
                                <option key="coordinator" value='coordinator'>Coordinator</option>
                                <option key="student" value='student'>Student</option>
                                <option key="guest" value='guest'>Guest</option>
                            </Form.Control>
                        </Form.Group>

                        {role !== 'admin' && (
                            <Form.Group controlId="status">
                                <Form.Label>Faculty <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control as="select" value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                                    {faculties && faculties.map(f => (
                                        <option key={f.name} value={f._id}>{f.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
            {loadingDelete && <Loader />}
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.email}</td>
                            <td>{user.profile.firstName} {user.profile.lastName}</td>
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
