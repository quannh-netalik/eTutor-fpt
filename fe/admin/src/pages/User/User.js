import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Container, Form, Modal, Table, Row, Col } from 'react-bootstrap';

import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';

import { formatDate } from '../../utils';

import { getListFaculty } from '../../actions/faculty.action';
import {
    createUserAction,
    getUserListAction,
    deleteUserAction,
} from '../../actions/user.action';


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

    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);


    const dispatch = useDispatch();
    const { loading: loadingListFaculty, error: errorList, faculties } = useSelector(({ listFaculty }) => listFaculty);
    const { loading: loadingUserList, users } = useSelector(({ userList }) => userList);
    const { loading: loadingCreate, error: errorCreate } = useSelector(({ userCreate }) => userCreate);
    const { loading: loadingDelete, error: errorDelete } = useSelector(({ userDelete }) => userDelete);

    useEffect(() => {
        if (!loadingCreate && !errorCreate) {
            setCreateMessage('Create new user successful');
            setTimeout(() => {
                resetField();
            }, 1000);
        }
    }, [loadingCreate, errorCreate, loadingDelete]);

    useEffect(() => {
           dispatch(getUserListAction({
               limit,
               skip,
               isDeleted: false,
           }));
    }, [limit, skip, loadingCreate, loadingDelete]);

    useEffect(() => {
        if (!loadingListFaculty) {
            setFaculty(faculties[0]?._id);
        }
    }, [loadingListFaculty, faculties]);

    useEffect(() => {
        setTotal(users?.total);
    }, [users]);

    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };

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
        dispatch(deleteUserAction(facultyId));
    };

    return (
        <Container>
            <h1>List User</h1>
            {loadingUserList && <Loader />}

            <div className="d-flex justify-content-between align-items-center">
                <h2 className="m-0">Total user(s): {total}</h2>
                <Button
                    type="submit"
                    variant="success"
                    style={{ display: 'flex', marginLeft: 'auto' }}
                    onClick={openCreateModal}
                >
                    New User
                </Button>
            </div>

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

                        <Form.Group controlId="role">
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
                        <th>User-Id</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.data && users.data.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.email}</td>
                            <td>{user.profile.firstName} {user.profile.lastName}</td>
                            <td>{user.profile.phone}</td>
                            <td>{user.profile.role}</td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>
                                <LinkContainer to={`/user/detail/${user._id}`}>
                                    <Button type="submit" variant="primary" className="btn-sm">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td>
                                <Button type="submit" variant="primary" className="btn-sm" onClick={() => onDeleteHandler(user._id)}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-end">
                <Form.Group controlId="limit" style={{maxWidth: '100px'}}>
                    <Form.Control as="select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                        <option key="10" value={10}>10</option>
                        <option key="20" value={20}>20</option>
                    </Form.Control>
                </Form.Group>

                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    pageCount={Math.ceil(total / limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'page-item'}
                    activeClassName={'page-item active'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    pageClassNam={'page-item'}
                    pageLinkClassName={'page-link'}
                />
            </div>
        </Container>
    );
};

export default User;
