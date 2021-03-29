import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BlogLabel from '../common/BlogLabel';
import { AWS_FOLDER } from '../../config';
import { formatDate } from '../../utils';

import './index.css';
import { updateBlogAction } from '../../actions/blog.action';
import { BLOG_LIST_SUCCESS } from '../../constants/blog.reducer';

const Blog = ({ blog, redirect, censorship }) => {
    const dispatch = useDispatch();

    const { user } = useSelector(({ userLogin }) => userLogin);
    const { blogs } = useSelector(({ blogList }) => blogList);

    const linkToBlogDetail = `/blog/${blog._id}?redirect=${redirect}`;

    const setStatusBlog = (blogId, status) => {
        dispatch(updateBlogAction({
            id: blog._id,
            body: {
                status,
            },
        }));

        if (blogs.data) {
            dispatch({
                type: BLOG_LIST_SUCCESS,
                payload: {
                    ...blogs,
                    data: blogs.data.map(blog => blog._id === blogId ? { ...blog, status } : blog)
                }
            });
        }
    };

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={linkToBlogDetail}>
                <Card.Img src={`${AWS_FOLDER.IMAGE}${blog.bgImage}`} variant="top" fluid="true" />
            </Link>

            <Card.Body>
                <Link to={linkToBlogDetail}>
                    <Card.Title as="div">
                        <div className="d-flex justify-content-between">
                            <h2>{blog.title}</h2>
                            <BlogLabel status={blog.status} />
                        </div>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-4 blog-content">
                        {blog.content || 'No content'}
                    </div>
                </Card.Text>

                <Card.Text as="div" className="my-2">
                    <Row>
                        <Col className="py-2">
                            Created By:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-flex">
                                <Image src={`${AWS_FOLDER.IMAGE}${blog.createdBy?.profile?.avatar}`} variant="top" roundedCircle style={{ width: '30px', height: '30px' }} />
                                <div className="blog-author">
                                    {blog.createdBy.profile.firstName} {blog.createdBy.profile.lastName}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Text>

                <Card.Text as="div" style={{ paddingTop: '20px' }}>
                    <div className="d-flex justify-content-end py-1">
                        From: {formatDate(blog.createdAt)}
                    </div>
                    <div className="d-flex justify-content-end py-1">
                        Last Updated: {formatDate(blog.updatedAt)}
                    </div>
                </Card.Text>

                <Card.Text as="div" className="d-flex justify-content-between">
                    <Card.Text as="div">
                        {/** Validate only when is censorship, pending blog with coordinator role */}
                        {(censorship && blog.status === 'pending' && user.profile.role === 'coordinator') && (
                            <Row>
                                <Col>
                                    <Button className="rounded" variant="outline-success" onClick={() => setStatusBlog(blog._id, 'approve')}>Approve</Button>
                                </Col>
                                <Col>
                                    <Button className="rounded" variant="outline-danger" onClick={() => setStatusBlog(blog._id, 'reject')}>Reject</Button>
                                </Col>
                            </Row>
                        )}
                    </Card.Text>
                    <Card.Text as="h3">
                        <LinkContainer to={linkToBlogDetail}>
                            <Button className="btn-sm rounded my-3" variant="outline-secondary">
                                <i className="fa fa-star mr-1"></i>Read more
                            </Button>
                        </LinkContainer>
                    </Card.Text>
                </Card.Text>


            </Card.Body>
        </Card>
    );
};

export default Blog;
