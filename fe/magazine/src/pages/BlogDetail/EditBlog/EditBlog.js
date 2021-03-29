/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { blogDetailAction, removeFileBlogAction, updateBlogAction, uploadBlogBgImageAction, uploadBlogFileAction } from '../../../actions/blog.action';

import Loader from '../../../components/common/Loader';
import Message from '../../../components/common/Message';
import { AWS_FOLDER } from '../../../config';
import { BLOG_DETAIL_SUCCESS } from '../../../constants/blog.reducer';

import { formatDate } from '../../../utils';

const EditBlog = ({ match, history }) => {
    const dispatch = useDispatch();

    const [currentBlog, setCurrentBlog] = useState({});
    const [message, setMessage] = useState('');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('');
    const [bgImage, setBgImage] = useState({});
    const [newFile, setNewFile] = useState({});
    const [bgImageSrc, setBgImageSrc] = useState('');

    const { user } = useSelector(({ userLogin }) => userLogin);
    const { loading: loadingBlogUpdate, error: errorBlogUpdate, blog } = useSelector(({ blogDetail }) => blogDetail);

    useEffect(() => {
        // if (
        //     user.profile.role !== 'student' ||
        //     user.profile.role !== 'coordinator' ||
        //     (user.profile.role === 'student' && user._id !== blog.createdBy)
        // ) {
        //     history.push('/faculty');
        // }
    }, [user, blog]);

    useEffect(() => {
        if (!blog?.title && blog?._id !== match.params.id) {
            dispatch(blogDetailAction(match.params.id));
        } else {
            setCurrentBlog(blog);
            setTitle(blog.title || '');
            setContent(blog.content || '');
            setStatus(blog.status || 'pending');
            setBgImageSrc(blog.bgImage ? `${AWS_FOLDER.IMAGE}${blog.bgImage}` : '');
        }
    }, [match, blog]);

    const handleBgImage = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) => {
            setBgImageSrc(e.target.result);
        };
        setBgImage(e.target.files[0]);

        dispatch(uploadBlogBgImageAction(currentBlog._id, e.target.files[0]));
    };

    const onEditBlogHandler = () => {
        dispatch(updateBlogAction({
            id: match.params.id,
            body: {
                title,
                content,
                status,
            },
        }));

        setMessage('Update successful');
        setTimeout(() => setMessage(''), 1500);
    };

    const handleRemoveFileBlog = (fileId) => {
        dispatch(removeFileBlogAction({ fileId, blogId: currentBlog._id }));

        dispatch({
            type: BLOG_DETAIL_SUCCESS,
            payload: {
                ...currentBlog,
                files: currentBlog.files.filter(file => file._id !== fileId)
            }
        });

        setMessage('Remove File successful');
        setTimeout(() => setMessage(''), 1500);
    };

    const handleUploadBlogFile = (e) => {
        setNewFile(e.target.files[0]);
        dispatch(uploadBlogFileAction(currentBlog._id, e.target.files[0]));
    };

    return (
        <Container>
            <h1>Edit Blog Blog</h1>
            {loadingBlogUpdate && <Loader />}
            {errorBlogUpdate && <Message variant="danger">{errorBlogUpdate}</Message>}
            {message && <Message variant="success">{message}</Message>}

            <Form onSubmit={onEditBlogHandler}>
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
                            <Form.Label>Content</Form.Label>
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
                                value={`${currentBlog.term?.name || ''} ----- (from: ${formatDate(currentBlog.term?.startDate)} to: ${formatDate(currentBlog.term?.endDate)})`}
                                disabled
                            ></Form.Control>
                        </Form.Group>

                        {user.profile.role === 'coordinator' && (
                            <Form.Group controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>

                                    <option value="approve">Approve</option>
                                    {currentBlog.status === 'pending' && (
                                        <option value="pending">Pending</option>
                                    )}
                                    <option value="reject">Reject</option>
                                </Form.Control>
                            </Form.Group>
                        )}
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
                                        onChange={(e) => handleUploadBlogFile(e)}
                                        id="custom-file-translate-scss"
                                        label="Select files"
                                        lang="en"
                                        custom
                                    />
                                    {blog?.files?.length ? blog.files.map(file => (
                                        <Row key={file?._id} style={{ marginTop: '20px', border: '1px solid rgb(194, 193, 193)', marginLeft: '5px', marginRight: '5px' }} className="rounded">
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
                                                            {file?.fileName}
                                                        </div>
                                                    </div>
                                                    <div onClick={() => handleRemoveFileBlog(file?._id)} style={{ cursor: 'pointer' }}>
                                                        <i style={{fontSize: 22}} className="far fa-times-circle"></i>
                                                    </div>
                                                </div>
                                                <div className="py-2">
                                                    <div style={{ fontSize: '18px', fontWeight: 800 }}>
                                                        File Type:
                                                    </div>
                                                    <div style={{ fontSize: '14px', wordWrap: 'break-word' }}>
                                                        {file?.fileName && file?.fileName.split('.').pop()}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    )) : <></>}
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex justify-content-between">
                            <LinkContainer to={`/blog/${currentBlog._id}`}>
                                <Button variant="secondary">Back</Button>
                            </LinkContainer>
                            <Button type="submit" variant="success">Update</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default EditBlog;
