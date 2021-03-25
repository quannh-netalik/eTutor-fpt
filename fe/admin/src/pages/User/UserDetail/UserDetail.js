import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../components/common/Loader';
import Message from '../../../components/common/Message';
import FormContainer from '../../../components/common/FormContainer';

import { getUserDetailAction, updateUserAction, uploadUserAvatarAction } from '../../../actions/user.action';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { getListFaculty } from '../../../actions/faculty.action';
import { AWS_FOLDER } from '../../../config';
import { LinkContainer } from 'react-router-bootstrap';
const UserDetail = ({ match, location }) => {
    const query = new URLSearchParams(location.search);
    const isMyProfile = query.get('profile');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChangePassword, setIsChangePassword] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [faculty, setFaculty] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarSrc, setAvatarSrc] = useState('');

    const dispatch = useDispatch();

    const { loading: loadingListFaculty, faculties } = useSelector(({ listFaculty }) => listFaculty);
    const { loading: loadingDetail, error: errorDetail, user } = useSelector(({ userDetail }) => userDetail);
    const { loading: loadingUpdate, error: errorUpdate, user: userUpdate } = useSelector(({ userUpdate }) => userUpdate);

    useEffect(() => {
        if (!user?.email || user?._id !== match.params.id) {
            dispatch(getUserDetailAction(match.params.id));
        } else {
            setFirstName(user.profile.firstName);
            setLastName(user.profile.lastName);
            setRole(user.profile.role);
            setFaculty(user.profile.faculty);
            setAddress(user.profile.address);
            setCity(user.profile.city);
            setPhone(user.profile.phone);
            setAvatarSrc(`${AWS_FOLDER.IMAGE}${user?.profile?.avatar}`);
        }
    }, [dispatch, user, match]);

    useEffect(() => {
        dispatch(getListFaculty({
            isActive: true,
        }));
    }, [dispatch]);

    useEffect(() => {
        if (!loadingListFaculty && role !== 'admin') {
            setFaculty(faculties[0]?._id);
        }
    }, [loadingListFaculty, faculties]);

    const handleChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setAvatarSrc(e.target.result);
        };

        setAvatar(e.target.files[0]);
        console.log(avatar);
        console.log(e.target.files[0]);
    };

    const onUpdateHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserAction({
            id: user._id,
            body: {
                profile: {
                    firstName,
                    lastName,
                    role,
                    address,
                    city,
                    phone,
                    faculty,
                },
            },
        }));

        if (avatar) {
            dispatch(uploadUserAvatarAction({
                id: user._id,
                file: avatar,
            }));
        }

        setPassword('');
        setConfirmPassword('');
    };

    return (
        <FormContainer md={12}>
            <h1>{isMyProfile ? 'My profile' : 'User Detail'}</h1>
            {(loadingDetail || loadingUpdate) && <Loader />}
            {errorDetail && <Message variant="danger">{errorDetail}</Message>}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {userUpdate?.message && <Message variant="success">{userUpdate.message}</Message>}
            <Form onSubmit={onUpdateHandler}>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={user?.email || ''}
                                        disabled={true}
                                    ></Form.Control>
                                </Form.Group>

                                {isMyProfile && (
                                    <>
                                        <Form.Group controlId="isChangePassword">
                                            <div className="d-flex">
                                                <Form.Check
                                                    type="checkbox"
                                                    value={isChangePassword}
                                                    onChange={() => setIsChangePassword(!isChangePassword)}
                                                />
                                                {console.log(isChangePassword)}
                                                <Form.Label>Change password?</Form.Label>
                                            </div>
                                        </Form.Group>
                                        <br/>

                                        {isChangePassword && (
                                            <>
                                                <Form.Group controlId="password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Enter password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId="confirmPassword">
                                                    <Form.Label>Confirm password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="Enter confirm password"
                                                        value={confirmPassword || ''}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </>
                                        )}
                                    </>
                                )}

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
                            </Col>
                            <Col>
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
                            </Col>
                        </Row>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <LinkContainer to="/user">
                                <Button type="submit" variant="light">Back</Button>
                            </LinkContainer>

                            <Button type="submit" variant="dark">Update</Button>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="d-flex align-items-center flex-column">
                            <Image src={avatarSrc || ''} roundedCircle fluid alt={user?._id} style={{ width: '205px', height: '205px', objectFit: 'cover' }} />
                            <Form.File
                                onChange={handleChangeAvatar}
                                id="custom-file-translate-scss"
                                label="Select avatar"
                                accept='image/*'
                                lang="en"
                                custom
                            />
                        </div>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default UserDetail;
