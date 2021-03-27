import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { blogDetailAction, downloadBlogFile } from '../../actions/blog.action';
import { commentCreateAction, commentListAction } from '../../actions/comment.action';
import moment from 'moment-timezone';

import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import FormContainer from '../../components/common/FormContainer';
import { AWS_FOLDER } from '../../config';
import { formatDate } from '../../utils';
import FacultyInfo from '../../components/FacultyInfo';
import TermInfo from '../../components/TermInfo';

const BlogDetail = ({ match }) => {
    const dispatch = useDispatch();
    const [currentBlog, setCurrentBlog] = useState({});

    const [newComment, setNewComment] = useState('');

    const { user } = useSelector(({ userLogin }) => userLogin);
    const { loading: loadingDetail, error: errorDetail, blog } = useSelector(({ blogDetail }) => blogDetail);
    const { comments } = useSelector(({ commentList }) => commentList);
    const { loading: loadingCreateComment } = useSelector(({ commentCreate }) => commentCreate);

    useEffect(() => {
        if (!blog?.title || match.params.id !== blog._id) {
            dispatch(blogDetailAction(match.params.id));
        } else {
            setCurrentBlog(blog);
            setNewComment('');
        }
    }, [match, blog]);

    useEffect(() => {
        if (!loadingCreateComment) {
            dispatch(commentListAction(match.params.id));
            setNewComment('');
        }
    }, [loadingCreateComment]);

    const handleDownloadFile = (fileId, fileName) => {
        dispatch(downloadBlogFile({ fileId, fileName, blogId: currentBlog._id }));
    };

    const handleComment = (e) => {
        if (e.keyCode === 27) {
            setNewComment('');
        }

        if (e.keyCode === 13 && newComment.length) {
            dispatch(commentCreateAction({
                blog: currentBlog._id,
                content: newComment,
            }));
        }
    };

    return (
        <FormContainer md={12}>
            <Row>
                {/**Additional info */}
                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <FacultyInfo faculty={currentBlog.faculty} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <TermInfo currentTerm={currentBlog.term || {}} />
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-center" style={{ padding: 20 }}>
                            <LinkContainer to="/">
                                <Button className="rounded" variant="secondary">Back to blogs</Button>
                            </LinkContainer>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={8}>
                    {loadingDetail && <Loader />}
                    {errorDetail && <Message variant="danger">{errorDetail}</Message>}
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Image src={`${AWS_FOLDER.IMAGE}${currentBlog.bgImage}`} variant="top" fluid="true" />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={8}>
                                    <h1>{currentBlog.title}</h1>
                                </Col>
                                <Col className="align-items-center" style={{ paddingTop: '10px' }}>
                                    <Row>
                                        <Image src={`${AWS_FOLDER.IMAGE}${currentBlog.createdBy?.profile?.avatar}`} variant="top" roundedCircle style={{ width: '50px', height: '50px' }} />
                                        <Col>
                                            <div>{currentBlog.createdBy?.profile?.firstName} {currentBlog.createdBy?.profile?.lastName}</div>
                                            <div>{formatDate(currentBlog.createdAt)}</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="py-3">
                                {currentBlog.content || 'No Content'}
                            </div>
                        </ListGroup.Item>
                        {(currentBlog.files && !!currentBlog.files.length) && (
                            <ListGroup.Item>
                                <Row>
                                    <Col md={3}>
                                        <div className="py-2">
                                            Uploaded files:
                                        </div>
                                    </Col>
                                    <Col>
                                        {currentBlog.files.map((file, index) => (
                                            <div
                                                key={`${file.id}-${index}`}
                                                className="py-2"
                                                style={{ cursor: 'pointer', fontWeight: 'bold', color: '#3f3ff2' }}
                                                onClick={() => handleDownloadFile(file._id, file.fileName)}
                                            >
                                                {file.fileName} <i className="fa fa-download pull-right"></i>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        {(currentBlog.faculty?._id && currentBlog.faculty._id === user.profile.faculty?._id) && (
                            <ListGroup.Item>
                                <h5>Comments</h5>
                                <Form.Control
                                    type="text"
                                    placeholder="Comment..."
                                    style={{
                                        border: '1px solid #c2c1c1'
                                    }}
                                    value={newComment}
                                    onKeyUp={handleComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    required={true}
                                ></Form.Control>

                                {!!comments?.length && comments.map((cmt, index) => (
                                    <Row key={index} className="py-2">
                                        <Col>
                                            <Row className="align-items-center" style={{ minHeight: '50px' }}>
                                                <Col md={1}>
                                                    <Image src={`${AWS_FOLDER.IMAGE}${cmt.user?.profile?.avatar}`} roundedCircle style={{ width: '40px', height: '40px' }} />
                                                </Col>
                                                <Col>
                                                    <div style={{ backgroundColor: 'rgb(232 235 237)', borderRadius: '20px 20px', paddingLeft: '10px' }} className="py-2">
                                                        <Row>
                                                            <Col>
                                                                <div style={{ fontWeight: 'bold', color: '#3f3ff2' }}>{cmt.user?.profile?.firstName} {cmt.user?.profile?.lastName}</div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <div>{cmt.content}</div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Row>
                                                        <div style={{ fontSize: '10px', paddingLeft: '20px' }}>
                                                            {moment(cmt.createdAt).fromNow()}
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                ))}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </FormContainer >
    );
};

export default BlogDetail;
