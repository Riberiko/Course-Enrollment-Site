import React from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import image from './assets/images/building.jpeg';

function handleLogin(){
    const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:8000";
    const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("inputPassword5").value;


    if (!username || !password) {
        console.error("Username and password are required");
        return;
    }

    fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password,type:"student_users" }),
    })
    .then((res) => {
        if (!res.ok) throw new Error("Login failed: " + res.status);
        return res
    })
    .then((data) => {
        console.log(data);
        window.location.href = "/dashboard";
        // Handle successful login, e.g., storing the token, redirecting, etc.
    })
    .catch((err) => {
       console.log(err);
        // Handle login failed, show user feedback
    });
}


export default () => {
    return(
<Container>
    <Row className="justify-content-md-center">
        <Col md="auto">
        <Image src={image}  style={{ width: '400px', height: '260px' }} />
        </Col>
    </Row>
    <div className = "vh-100 d-flex align-items-center">
    <Row className="justify-content-md-center">
        <Col md="auto">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputUsername">Username</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputUsername"
                        aria-describedby="usernameHelpBlock"
                        placeholder="Enter username"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        placeholder="Enter password"
                    />
                </Form.Group>
     
            </Form>
        </Col>
    </Row>
    </div>
    <div className= "row">
    <InputGroup className="mb-3">
    <InputGroup.Radio aria-label="Radio button for Student" name="userRole" />
    <InputGroup.Text>Student</InputGroup.Text>
</InputGroup>

<InputGroup className="mb-3">
    <InputGroup.Radio aria-label="Radio button for Teacher" name="userRole" />
    <InputGroup.Text>Teacher</InputGroup.Text>
</InputGroup>
     </div>
     <Row className="justify-content-md-center">
       <div className='text-center'>
            <Button type="button" className="btn btn-primary btn-lg" style = {
                {backgroundColor : "skyblue", marginBottom : "0"}} onClick={handleLogin}>Login</Button>
        </div>
    </Row>

</Container>



          
 
    )
}