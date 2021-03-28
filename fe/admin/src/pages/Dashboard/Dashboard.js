import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { statisticReport } from '../../actions/report.action';
import { getListTerm } from '../../actions/term.action';
import Input from '../../components/UI/Input';
import { Bar } from 'react-chartjs-2';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(({ userLogin }) => userLogin);
    const { statistic } = useSelector(({ statistic }) => statistic);
    const { terms } = useSelector(({ listTerm }) => listTerm);
    const [termId, setTermId] = useState('');

    useEffect(() => {
        dispatch(statisticReport());
        dispatch(getListTerm());
    }, []);

    useEffect(() => {
        terms && terms.length && setTermId(terms[0]._id);
    }, [terms]);

    return (
        <Container>
            <h1>Welcome back, {user?.profile?.firstName} {user?.profile?.lastName}.</h1>
            {terms && (
                <Input
                    label="Term"
                    type="select"
                    value={termId}
                    onChange={(e) => setTermId(e.target.value)}
                    options={terms}
                    placeholder="Select Term"
                />
            )}
            <Row>
                <Col sm="12">
                    {(statistic && Array.isArray(statistic)) && (
                        <Bar
                            data={{
                                labels: statistic.filter(x => x._id.term === termId).map(x => x._id.facultyName),
                                datasets: [{
                                    label: 'Number of blogs of each faculty in each term',
                                    data: statistic.filter(x => x._id.term === termId).map(x => x.count),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }]
                            }}
                            height={400}
                            width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            fontColor: 'black',
                                            beginAtZero: true
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: 'black',
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    display: true,
                                }
                            }}
                        />
                    )}
                </Col>
                <Col sm='12'>
                    {(statistic && Array.isArray(statistic)) && (
                        <Bar
                            data={{
                                labels: statistic.filter(x => x._id.term === termId).map(x => x._id.facultyName),
                                datasets: [{
                                    label: 'Number of approved blogs of each faculty in each term',
                                    data: statistic.filter(x => x._id.term === termId && x._id.status === 'approve').map(x => x.count),
                                    backgroundColor: [
                                        'rgba(11, 156, 49, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)'
                                    ],
                                    borderWidth: 1
                                },
                                {
                                    label: 'Number of rejected blogs of each faculty in each term',
                                    data: statistic.filter(x => x._id.term === termId && x._id.status === 'reject').map(x => x.count),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                    ],
                                    borderWidth: 1
                                }
                                ]
                            }}
                            height={400}
                            width={600}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            fontColor: 'black',
                                            beginAtZero: true
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            fontColor: 'black',
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                legend: {
                                    display: true,
                                }
                            }}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
