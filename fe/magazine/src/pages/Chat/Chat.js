import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { API_CONFIG } from '../../config';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { getUserListAction } from '../../actions/user.action';
import { afterSendMessage, messageListAction } from '../../actions/message.action';

let socket;

const Chat = () => {

    const dispatch = useDispatch();
    const endpoint = API_CONFIG.END_POINT;

    const { userList } = useSelector(state => state.userList);
    const userLogin = useSelector(state => state.userLogin);
    const { messages } = useSelector(state => state.messageList);
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

    useEffect(() => {
        dispatch(getUserListAction());
        dispatch(messageListAction());
    }, []);

    useEffect(() => {
        socket = io(endpoint);
        const room = 'Joker';

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
        if (messages) {
            if (messages[0]?.sender._id === userLogin.user._id) {
                setReceiverId(messages[0]?.receiver._id);
                const user = (userList && Array.isArray(userList.data)) && userList.data.find(usr => usr._id === messages[0]?.receiver._id);
                if (user) {
                    setReceiverName(user.profile.firstName + ' ' + user.profile.lastName);
                }
            } else {
                setReceiverId(messages[0]?.sender._id);
                const user = (userList && Array.isArray(userList.data)) && userList.data.find(usr => usr._id === messages[0]?.sender._id);
                if (user) {
                    setReceiverName(user.profile.firstName + ' ' + user.profile.lastName);
                }
            }
        }
    }, [messages]);


    return (
        <Container>
            <Row>
                <Col sm="4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Contact</Card.Header>
                        <ListGroup variant="flush">
                            {
                                (userList && Array.isArray(userList.data)) && userList.data.filter(usr => usr._id !== userLogin._id && usr.profile.role !== 'admin').map((usr, index) => (
                                    <ListGroup.Item key={index}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setReceiverId(usr._id)}
                                    >
                                        {usr.profile.firstName + ' ' + usr.profile.lastName}
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Col sm="8">
                    <Card>
                        <Card.Header>{receiverName}</Card.Header>
                        <Card.Body>
                            {
                                (messages && Array.isArray(messages)) && messages.filter(msg =>
                                    (msg.sender._id === userLogin.user._id && msg.receiver._id === receiverId) ||
                                    (msg.sender._id === receiverId && msg.receiver._id === userLogin.user._id)
                                ).map((msg, index) => {
                                    msg.sender._id !== userLogin.user._id ? (
                                        <Card.Body key={index}>
                                            <Card.Title>{msg.sender.profile.firstName}</Card.Title>
                                            <Card.Text>
                                                {msg.message}
                                            </Card.Text>
                                        </Card.Body>
                                    ) : (
                                        <Card.Body key={index}>
                                            <Card.Title>{userLogin.user.profile.firstName}</Card.Title>
                                            <Card.Text>
                                                {msg.message}
                                            </Card.Text>
                                        </Card.Body>
                                    );
                                })
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
        </Container>
    );
};

export default Chat;
