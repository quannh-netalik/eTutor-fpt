import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Form, ListGroup, Row, Image } from 'react-bootstrap';
import { io } from 'socket.io-client';

import { API_CONFIG, AWS_FOLDER } from '../../config';
import { getUserListAction } from '../../actions/user.action';
import { afterSendMessage, messageListAction } from '../../actions/message.action';

let socket;

const Chat = () => {
    const dispatch = useDispatch();
    const endpoint = API_CONFIG.END_POINT;

    const { userList } = useSelector(state => state.userList);
    const userLogin = useSelector(state => state.userLogin);
    const { messages } = useSelector(state => state.messageList);
    const [receiver, setReceiver] = useState({});
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [receiverName, setReceiverName] = useState('');

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            socket.emit('Send message', {
                receiver: receiverId,
                message,
                sender: userLogin && userLogin.user._id
            });
            setMessage('');
        }
    };

    const handleShowMessageBox = (id) => {
        setReceiverId(id);
        const user = (userList && Array.isArray(userList.data)) && userList.data.find(usr => usr._id === id);
        if (user) {
            setReceiverName(user.profile.firstName + ' ' + user.profile.lastName);
        }
    };

    useEffect(() => {
        dispatch(getUserListAction({ limit: -1 }));
        dispatch(messageListAction());
    }, []);

    useEffect(() => {
        socket = io(endpoint);
        const room = 'magazine';

        socket.emit('room', room);

        socket.on('Send message back', (msg) => {
            dispatch(afterSendMessage(msg));
        });

        return () => {
            socket.emit('disconnection');
            socket.off();
        };
    }, []);

    useEffect(() => {
        if (messages && !receiverId) {
            if (messages[0]?.sender._id === userLogin.user._id) {
                setReceiverId(messages[0]?.receiver._id);
                const user = (userList && Array.isArray(userList.data)) && userList.data.find(usr => usr._id === messages[0]?.receiver._id);
                if (user) {
                    setReceiver(user);
                    setReceiverName(user.profile.firstName + ' ' + user.profile.lastName);
                }
            } else {
                setReceiverId(messages[0]?.sender._id);
                const user = (userList && Array.isArray(userList.data)) && userList.data.find(usr => usr._id === messages[0]?.sender._id);
                if (user) {
                    setReceiver(user);
                    setReceiverName(user.profile.firstName + ' ' + user.profile.lastName);
                }
            }
        }
    }, [messages]);


    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Header>Contact</Card.Header>
                        <ListGroup variant="flush">
                            {
                                (userList && Array.isArray(userList.data)) && userList.data.filter(usr => usr._id !== userLogin._id && usr.profile.role !== 'admin').map((usr, index) => (
                                    <ListGroup.Item key={index} style={{ cursor: 'pointer' }} onClick={() => handleShowMessageBox(usr._id)}>
                                        <Row>
                                            <Col md={3}>
                                                <Image src={`${AWS_FOLDER.IMAGE}${usr.profile.avatar}`} roundedCircle fluid />
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Col style={{ fontWeight: 'bold' }}>
                                                        {usr.profile.firstName + ' ' + usr.profile.lastName}
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{ fontSize: 10 }}>
                                                        Faculty: {usr.profile.faculty?.name}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col md={1}>
                                    <Image src={`${AWS_FOLDER.IMAGE}${receiver.profile?.avatar}`} roundedCircle fluid />
                                </Col>
                                <Col style={{ fontSize: 20, fontWeight: 800 }}>
                                    {receiverName}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            {
                                (messages && Array.isArray(messages)) && messages.filter(msg =>
                                    (msg.sender._id === userLogin.user._id && msg.receiver._id === receiverId) ||
                                    (msg.sender._id === receiverId && msg.receiver._id === userLogin.user._id)
                                ).map((msg, index) => (
                                    msg.sender._id !== userLogin.user._id ? (
                                        <Card.Body key={index}>
                                            <Card.Title>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={`${AWS_FOLDER.IMAGE}${msg.sender.profile?.avatar}`} roundedCircle fluid />
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginBottom: '15px' }}>{msg.sender.profile.firstName} {msg.sender.profile.lastName}</div>
                                                        <div className="py-1" style={{ fontWeight: 500, fontSize: 14 }} md={6}>
                                                            <span style={{ backgroundColor: 'rgb(96, 96, 96)', color: 'white', padding: '12px 20px', borderRadius: '7px' }}>{msg.message}</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Title>
                                        </Card.Body>
                                    ) : (
                                        <Card.Body key={index}>
                                            <Card.Title>
                                                <Row>
                                                    <Col style={{ justifyContent: 'flex-end' }}>
                                                        <div style={{ justifyContent: 'flex-end', display: 'flex' }}>{userLogin.user.profile?.firstName} {userLogin.user.profile?.lastName}</div>
                                                        <div className="d-flex align-items-center justify-content-end py-1" style={{ fontWeight: 500, fontSize: 14 }} md={6}>
                                                            <span style={{ backgroundColor: '#0084ff', color: 'white', padding: '12px 20px', borderRadius: '7px' }}>{msg.message}</span>
                                                        </div>
                                                    </Col>
                                                    <Col md={1}>
                                                        <Image src={`${AWS_FOLDER.IMAGE}${userLogin.user.profile?.avatar}`} roundedCircle fluid />
                                                    </Col>
                                                </Row>
                                            </Card.Title>
                                        </Card.Body>
                                    )
                                ))
                            }
                        </Card.Body>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Write message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyUp={(e) => handleSendMessage(e)} />
                        </Form.Group>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default Chat;
