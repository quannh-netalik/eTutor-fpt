import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import Loader from '../../components/common/Loader';
import Blog from '../../components/Blog';
import { blogListAction } from '../../actions/blog.action';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(({ userLogin }) => userLogin);
    const { loading: loadingBlogList, blogs } = useSelector(({ blogList }) => blogList);

    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        dispatch(blogListAction({
            limit,
            skip,
            status: 'approve',
        }));
    }, [limit, skip]);

    useEffect(() => {
        setTotal(blogs?.total || 0);
    }, [blogs]);

    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };

    return (
        <Container>
            <h1>Welcome to the Magazine System, {user?.profile?.firstName} {user?.profile?.lastName}.</h1>
            {loadingBlogList && <Loader />}
            <Row className="d-flex justify-content-between align-items-end">
                <Form.Group controlId="limit" style={{ maxWidth: '100px' }}>
                    <Form.Control as="select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                        <option key="6" value={6}>6</option>
                        <option key="12" value={12}>12</option>
                    </Form.Control>
                </Form.Group>

                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    pageCount={Math.ceil(total / limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'page-item'}
                    activeClassName={'page-item active'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    pageClassNam={'page-item'}
                    pageLinkClassName={'page-link'}
                />
            </Row>
            <Row>
                {blogs?.data && blogs.data.map((blog) => (
                    <Col key={blog._id} sm={12} md={6} lg={4} xl={4}>
                        <Blog blog={blog} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
