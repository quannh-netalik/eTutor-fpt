import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';

import { blogDetailAction, downloadBlogFile } from '../../actions/blog.action';
import { commentListAction } from '../../actions/comment.action';

import Loader from '../../components/common/Loader';
import Message from '../../components/common/Message';
import FormContainer from '../../components/common/FormContainer';
import { AWS_FOLDER } from '../../config';
import { formatDate } from '../../utils';

const BlogDetail = ({ match }) => {
    const dispatch = useDispatch();
    const [currentBlog, setCurrentBlog] = useState({});
    const [blogComment, setBlogComment] = useState([]);

    const { user } = useSelector(({ userLogin }) => userLogin);
    const { loading: loadingDetail, error: errorDetail, blog } = useSelector(({ blogDetail }) => blogDetail);
    const { comments } = useSelector(({ commentList }) => commentList);

    useEffect(() => {
        if (!blog?.title || match.params.id !== blog._id) {
            dispatch(blogDetailAction(match.params.id));
            dispatch(commentListAction(match.params.id));
        } else {
            setCurrentBlog(blog);
            setBlogComment(comments);
        }
    }, [match, blog]);

    const handleDownloadFile = (fileId, fileName) => {
        dispatch(downloadBlogFile({ fileId, fileName, blogId: currentBlog._id }));
    };

    return (
        <FormContainer md={12}>
            <Row>
                <Col md={8}>
                    {loadingDetail && <Loader />}
                    {errorDetail && <Message variant="danger">{errorDetail}</Message>}
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Image src={`${AWS_FOLDER.IMAGE}${currentBlog.bgImage}`} rounded={true} variant="top" fluid />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col md={8}>
                                    <h1>{currentBlog.title}</h1>
                                </Col>
                                <Col className="align-items-center" style={{ paddingTop: '10px' }}>
                                    <Row>
                                        <Image src={`${AWS_FOLDER.IMAGE}${currentBlog.createdBy?.profile?.avatar}`} variant="top" roundedCircle={true} style={{ width: '50px', height: '50px' }} />
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
                                                style={{ cursor: 'pointer', fontWeight: 'bold', color: 'blue' }}
                                                onClick={() => handleDownloadFile(file._id, file.fileName)}
                                            >
                                                {file.fileName} <i className="fa fa-download pull-right"></i>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        {(currentBlog?.faculty?._id && currentBlog.faculty._id === user?.faculty?._id) && (
                            <div></div>
                        )}

                        <ListGroup.Item>
                            <h5>Comments</h5>
                            {!!blogComment?.length && blogComment.map((cmt, index) => (
                                <Row key={index} className="py-2">
                                    <Col>
                                        <Row className="align-items-center" style={{ minHeight: '50px' }}>
                                            <Col md={1}>
                                                <Image src={`${AWS_FOLDER.IMAGE}${cmt.user?.profile?.avatar}`} roundedCircle={true} style={{ width: '40px', height: '40px' }} />
                                            </Col>
                                            <Col>
                                                <div style={{ backgroundColor: 'rgb(232 235 237)', borderRadius: '20px 20px', paddingLeft: '10px' }} className="py-2">
                                                    <Row>
                                                        <Col>
                                                            <div style={{ fontWeight: 'bold', color: 'blue' }}>{cmt.user?.profile?.firstName} {cmt.user?.profile?.lastName}</div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <div>{cmt.content}</div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {/**Additional info */}
                <Col>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Faculty</h2>
                            <Row>
                                <Col md={4}>
                                    <strong>Name: </strong>
                                </Col>
                                <Col>
                                    <div>{currentBlog.faculty?.name}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <strong>Status: </strong>
                                </Col>
                                <Col>
                                    {
                                        currentBlog.faculty?.isDeleted ? (
                                            <div style={{ color: 'red', fontWeight: '800' }}>Deleted</div>
                                        ) : currentBlog.faculty?.isActive ? (
                                            <div style={{ color: 'green', fontWeight: '800' }}>Active</div>
                                        ) : (
                                            <div style={{ color: 'red', fontWeight: '800' }}>Suspended</div>
                                        )
                                    }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Term</h2>
                            <Row>
                                <Col md={4}>
                                    <strong>Name: </strong>
                                </Col>
                                <Col>
                                    <div>{currentBlog.term?.name}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <strong>Description: </strong>
                                </Col>
                                <Col>
                                    <div>{currentBlog.term?.description}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <strong>Start Date: </strong>
                                </Col>
                                <Col>
                                    <div>{formatDate(currentBlog.term?.startDate)}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <strong>End Date: </strong>
                                </Col>
                                <Col>
                                    <div>{formatDate(currentBlog.term?.endDate)}</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <strong>Status: </strong>
                                </Col>
                                <Col>
                                    {currentBlog.term?.isActive ? (
                                        <div style={{ color: 'green', fontWeight: '800' }}>Active</div>
                                    ) : (
                                        <div style={{ color: 'red', fontWeight: '800' }}>Suspended</div>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </FormContainer >
    );
};

export default BlogDetail;
