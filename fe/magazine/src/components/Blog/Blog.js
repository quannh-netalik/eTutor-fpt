import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import BlogLabel from '../common/BlogLabel';
import { AWS_FOLDER } from '../../config';
import { formatDate } from '../../utils';

import './index.css';

const Blog = ({ blog }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/blog/${blog._id}`}>
                <Card.Img src={`${AWS_FOLDER.IMAGE}${blog.bgImage}`} variant="top" rounded="true" fluid />
            </Link>

            <Card.Body>
                <Link to={`/blog/${blog._id}`}>
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
                        <Col md={2}>
                            <Image src={`${AWS_FOLDER.IMAGE}${blog.createdBy?.profile?.avatar}`} variant="top" roundedCircle={true} style={{ width: '30px', height: '30px' }} />
                        </Col>
                        <Col>
                            <div style={{ color: '#212142', fontWeight: 'bold' }}>
                                {blog.createdBy.profile.firstName} {blog.createdBy.profile.lastName}
                            </div>
                        </Col>
                    </Row>
                </Card.Text>

                <Card.Text as="div">
                    <div className="d-flex justify-content-end py-1">
                        From: {formatDate(blog.createdAt)}
                    </div>
                    <div className="d-flex justify-content-end py-1">
                        Last Updated: {formatDate(blog.updatedAt)}
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    <LinkContainer to={`/blog/${blog._id}`}>
                        <div className="d-flex my-3 justify-content-end">
                            <Button className="btn-sm rounded" variant="outline-secondary"><i className="fa fa-star mr-1"></i>Read more</Button>
                        </div>
                    </LinkContainer>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Blog;
