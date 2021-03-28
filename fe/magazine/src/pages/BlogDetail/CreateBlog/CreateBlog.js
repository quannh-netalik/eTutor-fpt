import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { termDetailAction } from '../../../actions/term.action';
import { blogCreateAction } from '../../../actions/blog.action';

import Loader from '../../../components/common/Loader';
import Message from '../../../components/common/Message';

import { formatDate } from '../../../utils';
import { BLOG_CREATE_RESET } from '../../../constants/blog.reducer';

const CreateBlog = ({ history, location }) => {
    const query = new URLSearchParams(location.search);
    const termId = query.get('termId');

    const dispatch = useDispatch();
    const { user } = useSelector(({ userLogin }) => userLogin);
    const { term } = useSelector(({ termDetail }) => termDetail);
    const { loading: loadingBlogCreate, error: errorBlogCreate, blog } = useSelector(({ blogCreate }) => blogCreate);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userTerm, setUserTerm] = useState({});
    const [file, setFile] = useState({});
    const [bgImage, setBgImage] = useState({});
    const [bgImageSrc, setBgImageSrc] = useState('');

    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(termDetailAction(termId));
    }, [termId]);

    useEffect(() => {
        if (term?.name) {
            const now = new Date();
            if (now < new Date(term.startDate) || now > new Date(term.endDate) || !term.isActive) {
                history.push('/faculty');
            }

            setUserTerm(term || {});
        }
    }, [term]);

    useEffect(() => {
        if (blog?.title) {
            setMessage('Create blog successful');

            setTimeout(() => {
                dispatch({ type: BLOG_CREATE_RESET });
                resetField();
            }, 1500);
        }
    }, [blog]);

    const resetField = () => {
        setTitle('');
        setContent('');
        setFile({});
        setBgImage({});
        setBgImageSrc('');
        setMessage('');
    };

    const handleBgImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setBgImageSrc(e.target.result);
        };
        console.log(bgImage);
        setBgImage(e.target.files[0]);
    };

    const onCreateBlogHandler = (e) => {
        e.preventDefault();

        dispatch(blogCreateAction({
            body: {
                title,
                content,
                faculty: user.profile.faculty._id,
                term: userTerm._id,
            },
            bgImage,
            file,
        }));
    };

    return (
        <Container>
            <h1>Add new Blog</h1>
            {loadingBlogCreate && <Loader />}
            {errorBlogCreate && <Message variant="danger">{errorBlogCreate}</Message>}
            {message && <Message variant="success">{message}</Message>}

            <Form onSubmit={onCreateBlogHandler}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="faculty">
                            <Form.Label>Faculty</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.profile.faculty?.name}
                                disabled
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="content">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                style={{ height: 200 }}
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required={true}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="term">
                            <Form.Label>Term</Form.Label>
                            <Form.Control
                                type="text"
                                value={`${userTerm.name} ----- (from: ${formatDate(userTerm.startDate)} to: ${formatDate(userTerm.endDate)})`}
                                disabled
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="bgImage">
                            <Form.Label>Set background Image</Form.Label>
                            <Row>
                                <Col>
                                    <Form.File
                                        onChange={handleBgImage}
                                        id="custom-file-translate-scss"
                                        style={{ marginBottom: '20px' }}
                                        label="Select background Image"
                                        accept='image/*'
                                        lang="en"
                                        custom
                                    />
                                    <Image src={bgImageSrc} fluid style={{ objectFit: 'cover', marginTop: '20x', paddingBottom: '10px' }} />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="bgImage">
                            <Form.Label>Set Files</Form.Label>
                            <Row>
                                <Col>
                                    <Form.File
                                        onChange={(e) => setFile(e.target.files[0])}
                                        id="custom-file-translate-scss"
                                        label="Select files"
                                        lang="en"
                                        custom
                                    />
                                    {file.name && (
                                        <Row style={{ marginTop: '20px', border: '1px solid rgb(194, 193, 193)', marginLeft: '5px', marginRight: '5px' }} className="rounded">
                                            <Col md={4}>
                                                <Image src="https://icon-library.com/images/file-icon-png/file-icon-png-12.jpg" fluid />
                                            </Col>
                                            <Col md={8}>
                                                <div className="d-flex justify-content-between py-2">
                                                    <div style={{ fontSize: '14px' }}>
                                                        <div style={{ fontSize: '18px', fontWeight: 800 }}>
                                                            File Name:
                                                        </div>
                                                        <div style={{ textOverflow: 'hidden', width: '100%', wordBreak: 'break-word' }}>
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                    <div onClick={() => setFile({})} style={{ cursor: 'pointer' }}>
                                                        <i style={{fontSize: 22}} className="far fa-times-circle"></i>
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <div style={{ fontSize: '18px', fontWeight: 800 }}>
                                                        File Type:
                                                    </div>
                                                    <div style={{ fontSize: '14px', wordWrap: 'break-word' }}>
                                                        {file.name && file.name.split('.').pop()}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between">
                            <LinkContainer to="/faculty">
                                <Button variant="secondary">Back</Button>
                            </LinkContainer>
                            <Button type="submit" variant="success">Create</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default CreateBlog;
