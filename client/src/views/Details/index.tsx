import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';

function DetailsView() {

    let { id } = useParams();

    return(
        <Row>
            <Col>You are viewing page id: {id}</Col>
        </Row>
    );
}

export default DetailsView;