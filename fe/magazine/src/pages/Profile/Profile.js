import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import FormContainer from '../../components/common/FormContainer';

import { USER_UPDATE_RESET } from '../../constants/user.constant';
import { getUserDetailAction, updateUserAction, uploadUserAvatarAction } from '../../actions/user.action';
import { AWS_FOLDER } from '../../config';

const Profile = ({ match }) => {
    const [message, setMessage] = useState('');

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

    const { user } = useSelector(({ userLogin }) => userLogin);
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

    const handleChangeAvatar = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setAvatarSrc(e.target.result);
        };

        setAvatar(e.target.files[0]);
    };

    const onUpdateHandler = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            setMessage('Password invalid');
            setTimeout(() => setMessage(''), 1200);
            return;
        }

        dispatch(updateUserAction({
            id: user._id,
            body: {
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

        setTimeout(() => {
            dispatch({ type: USER_UPDATE_RESET });
        }, 1000);
    };

    return (
        <FormContainer md={12}>
            <h1>My profile</h1>
            {loadingUpdate && <Loader />}
            {message && <Message variant="danger">{message}</Message>}
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

                                <Form.Group controlId="isChangePassword">
                                    <div className="d-flex">
                                        <Form.Check
                                            type="checkbox"
                                            value={isChangePassword}
                                            onChange={() => setIsChangePassword(!isChangePassword)}
                                        />
                                        <Form.Label>Change password?</Form.Label>
                                    </div>
                                </Form.Group>

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
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
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
                                    <Form.Control
                                        type="text"
                                        value={role}
                                        disabled={true}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="faculty">
                                    <Form.Label>Faculty <span style={{ color: 'red' }}>*</span></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={faculty}
                                        disabled={true}
                                    ></Form.Control>
                                </Form.Group>
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

export default Profile;
