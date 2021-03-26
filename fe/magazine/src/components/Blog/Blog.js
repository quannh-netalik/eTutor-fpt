import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AWS_FOLDER } from '../../config';
import { formatDate } from '../../utils';

import './index.css';

const Blog = ({ blog }) => {
    console.log(blog);

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/blog/${blog._id}`}>
                <Card.Img src={`${AWS_FOLDER.IMAGE}${blog.bgImage}`} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/product/${blog._id}`}>
                    <Card.Title as="div">
                        <strong>Title: <b>{blog.title}</b></strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3 blog-content">
                        Content: {blog.content}
                    </div>
                </Card.Text>

                <Card.Text as="div">
                    <div className="d-flex justify-content-between">
                        <div className="my-3">
                            {blog.createdBy.profile.firstName} {blog.createdBy.profile.lastName}
                        </div>
                        <div className="my-3">
                            {formatDate(blog.createdAt)}
                        </div>
                    </div>

                </Card.Text>

                <Card.Text as="h3">{blog.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Blog;
