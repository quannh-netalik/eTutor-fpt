import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
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

    const limit = 10;
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);

    const { user } = useSelector(({ userLogin }) => userLogin);
    const { loading: loadingTermDetail, term } = useSelector(({ termDetail }) => termDetail);
    const { loading: loadingTermList, terms } = useSelector(({ termList }) => termList);

    const { loading: loadingBlogList, blogs } = useSelector(({ blogList }) => blogList);

    // get term list
    useEffect(() => {
        dispatch(termListAction());
    }, [dispatch, user]);

    // after get termList, set the current term as the first term in list
    useEffect(() => {
        if (!loadingTermList) {
            setTermList(terms || []);
            setCurrentTerm(terms[0] || {});

            if (terms.length) {
                // get the blog list with the first term in list and the use faculty
                dispatch(blogListAction({
                    limit,
                    skip,
                    term: terms[0]?._id,
                    faculty: user.profile.faculty?._id,
                }));
            }
        }
    }, [loadingTermList, terms]);

    // after select term, set the current term as term detail (redux)
    useEffect(() => {
        if (!loadingTermDetail) {
            // get the blog list as the term changed
            dispatch(blogListAction({
                term: term._id,
                faculty: user.profile.faculty?._id,
            }));
            setCurrentTerm(term);
        }
    }, [loadingTermDetail]);

    useEffect(() => {
        setTotal(blogs?.total || 0);
    }, [blogs]);

    const handlePageChange = (page) => {
        let selected = page.selected;
        let skip = Math.ceil(selected * limit);
        setSkip(skip);
    };

    const handleChangeTerm = (e) => {
        dispatch(termDetailAction(e.target.value));
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
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {loadingBlogList ? <Loader /> : (
                                <>
                                    <Row>
                                        <Col md={5} className="py-2">
                                            <h5>{blogs.total} record(s)</h5>
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
                                                    pageClassNam={'page-item'}
                                                    pageLinkClassName={'page-link'}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    {!!blogs?.data && blogs.data.map((blog, index) => (
                                        <Col key={index}>
                                            <Blog blog={blog} />
                                        </Col>
                                    ))}
                                </>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Faculty;
