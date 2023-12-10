import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import CardStyle from './CardStyle';
import image from '../assets/images/Biology.jpeg';
import image2 from '../assets/images/Math.jpeg';
import image3 from '../assets/images/English.jpeg';
import image4 from '../assets/images/History.jpeg';

const style = {
    background: "linear-gradient(200deg, #173753, #1B4353, #2892D7)",
    width: "100%",
    height: "90%",
    overflow: "auto"
};

export default () => {
    return (
        <body style={style}>
            <Container>

                <Row className="justify-content-md-center mb-4">
                    <Col md={8}>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Col>
                </Row>


                <Row className="justify-content-md-center mb-2"> 
                    <Col md={6} style={{padding:'10px'}}>
                        <CardStyle imageSrc={image} cardTitle={"Biology"} />
                    </Col>
                    <Col md={6} style={{padding:'10px'}}>
                        <CardStyle imageSrc={image2} cardTitle={"Math"} />
                    </Col>
                </Row>
                <Row className="justify-content-md-center"> 
                    <Col md={6}>
                        <CardStyle imageSrc={image3} cardTitle={"English"} />
                    </Col>
                    <Col md={6}>
                        <CardStyle imageSrc={image4} cardTitle={"History"}/>
                    </Col>
                </Row>
            </Container>
        </body>
    );
};
