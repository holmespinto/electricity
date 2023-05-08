// @flow
import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

// components


// dummy records
const records = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
    { id: 3, firstName: 'Dave', lastName: 'G', username: '@dave' },
    { id: 4, firstName: 'Nik', lastName: 'N', username: '@nikn' },
    { id: 5, firstName: 'Shreyu', lastName: 'Navadiya', username: '@sn' },
];
const ResponsiveTable = () => {
    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Always responsive</h4>
                <p className="text-muted font-14 mb-4">
                    Across every breakpoint, use <code>responsive</code> attribute to create responsive tables
                </p>

                <Table className="mb-0" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{record.id}</th>
                                    <td>{record.firstName}</td>
                                    <td>{record.lastName}</td>
                                    <td>{record.username}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

const Tables = (): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <ResponsiveTable />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Tables;
