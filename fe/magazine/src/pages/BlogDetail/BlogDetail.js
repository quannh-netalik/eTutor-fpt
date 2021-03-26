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
        <FormContainer md={8}>
            {loadingDetail && <Loader />}
            {errorDetail && <Message variant="danger">{errorDetail}</Message>}
            <ListGroup>
                <ListGroup.Item>
                    <Image src={`${AWS_FOLDER.IMAGE}${currentBlog.bgImage}`} rounded variant="top" style={{ width: '700px', height: '300px' }} />
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
                                        <Image src={`${AWS_FOLDER.IMAGE}${cmt.user?.profile?.avatar}`} roundedCircle style={{ width: '40px', height: '40px' }} />
                                    </Col>
                                    <Col>
                                        <div style={{ backgroundColor: '#c3cace', borderRadius: '20px 20px', paddingLeft: '10px' }} className="py-2">
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

        </FormContainer >
    );
};

export default BlogDetail;
