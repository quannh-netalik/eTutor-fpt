import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import Loader from '../../components/common/Loader';

import { termDetailAction, termListAction } from '../../actions/term.action';
import { blogListAction } from '../../actions/blog.action';

import Blog from '../../components/Blog';
import TermInfo from '../../components/TermInfo';
import FacultyInfo from '../../components/FacultyInfo';

const Faculty = () => {
    const dispatch = useDispatch();
    const [currentTerm, setCurrentTerm] = useState({});
    const [termList, setTermList] = useState([]);

    const [filterStatus, setFilterStatus] = useState('');

    const limit = 6;
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1)

    const { user } = useSelector(({ userLogin }) => userLogin);
    const { loading: loadingTermDetail, term } = useSelector(({ termDetail }) => termDetail);
    const { loading: loadingTermList, terms } = useSelector(({ termList }) => termList);

    const { blogs } = useSelector(({ blogList }) => blogList);

    // get term list
    useEffect(() => {
        dispatch(termListAction());
    }, []);

    // after get termList, set the current term as the first term in list
    useEffect(() => {
        if (!loadingTermList && terms.length) {
            setTermList(terms || []);
            setCurrentTerm(terms[0] || {});

            dispatch(termDetailAction(terms[0]._id));
        }
    }, [loadingTermList]);

    // after select term, set the current term as term detail (redux)
    useEffect(() => {
        if (!loadingTermDetail && term?._id) {
            // get the blog list as the term changed
            dispatch(blogListAction({
                limit,
                skip,
                term: term._id,
                faculty: user.profile.faculty?._id,
                status: filterStatus === '' ? undefined : filterStatus,
            }));
            setCurrentTerm(term || {});
        }
    }, [loadingTermDetail, skip, filterStatus]);

    useEffect(() => {
        setTotal(blogs?.total || 0);
    }, [blogs]);

    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };

    const handleChangeTerm = (e) => {
        setSkip(0);
        dispatch(termDetailAction(e.target.value));
    };

    const changeFilterStatusHandler = (e) => {
        setSkip(0);
        setFilterStatus(e.target.value);
    };

    return (
        <Container>
            {loadingTermList && <Loader />}
            <Row>
                <Col md={4}>
                    <ListGroup>
                        <ListGroup.Item>
                            <FacultyInfo faculty={user.profile.faculty} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <TermInfo
                                isSelectTermList={true}
                                termList={termList}
                                handleChangeTerm={handleChangeTerm}
                                currentTerm={currentTerm}
                            />
                        </ListGroup.Item>

                        {
                            (
                                user.profile.role === 'student' &&
                                currentTerm.isActive &&
                                (new Date() > new Date(currentTerm.startDate) && new Date < new Date(currentTerm.endDate))
                            )
                                && (
                                    <ListGroup.Item className="d-flex justify-content-center" style={{ padding: 20 }}>
                                        <LinkContainer to={`/blog/create?termId=${currentTerm._id}`}>
                                            <Button className="rounded" variant="outline-success">Add new blog</Button>
                                        </LinkContainer>
                                    </ListGroup.Item>
                                )
                        }
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup variant="flush">
                        {loadingTermDetail ? <Loader /> : (
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4} className="py-2">
                                        <h5>{total} record(s)</h5>
                                    </Col>
                                    <Col>
                                        <Form.Control as="select" value={filterStatus} onChange={(e) => changeFilterStatusHandler(e)}>
                                            <option value="">All blogs</option>
                                            <option value="approve">Publish</option>
                                            <option value="pending">Pending</option>
                                            <option value="reject">Reject</option>
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <div className="d-flex justify-content-end py-2">
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
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                {!!blogs?.data && blogs.data.map((blog, index) => (
                                    <Col key={index}>
                                        <Blog blog={blog} redirect="/faculty" censorship />
                                    </Col>
                                ))}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Faculty;
