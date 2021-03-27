import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import BlogLabel from '../common/BlogLabel';
import { AWS_FOLDER } from '../../config';
import { formatDate } from '../../utils';

import './index.css';

const Blog = ({ blog }) => {
    console.log(blog);

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/blog/${blog._id}`}>
                <Card.Img src={`${AWS_FOLDER.IMAGE}${blog.bgImage}`} variant="top" rounded="true" style={{ width: '300px', height: '130px' }} />
            </Link>

            <Card.Body>
                <Link to={`/blog/${blog._id}`}>
                    <Card.Title as="div">
                        <div className="d-flex justify-content-between">
                            <strong>Title: <b>{blog.title}</b></strong>
                            <BlogLabel status={blog.status} />
                        </div>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3 blog-content">
                        Content: {blog.content || 'No content'}
                    </div>
                </Card.Text>

                <Card.Text as="div">
                    <div className="d-flex justify-content-between">
                        <div className="my-3">
                            <Image src={`${AWS_FOLDER.IMAGE}${blog.createdBy?.profile?.avatar}`} variant="top" roundedCircle={true} style={{ width: '30px', height: '30px' }} />
                        </div>
                        <div className="my-3" style={{ color: '#212142', fontWeight: 'bold' }}>
                            {blog.createdBy.profile.firstName} {blog.createdBy.profile.lastName} -
                        </div>
                        <div className="my-3">
                            {formatDate(blog.createdAt)}
                        </div>
                    </div>

                </Card.Text>

                <Card.Text as="h3">
                    <LinkContainer to={`/blog/${blog._id}`}>
                        <div className="d-flex my-3 justify-content-end">
                            <Button className="btn-sm"><i className="fa fa-star mr-1"></i>Read more</Button>
                        </div>
                    </LinkContainer>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Blog;
