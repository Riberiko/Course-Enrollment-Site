import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Image } from "react-bootstrap";
import {isAuthF} from '../helper'
import Button from 'react-bootstrap/Button';
import image from '../assets/images/building.avif';
import { useNavigate } from 'react-router-dom';

function handleLogin(user_type, navigate){
    const backendUrl = import.meta.env.BACKEND_URL || "http://localhost:8000";
    const username = document.getElementById("inputUsername").value;
    const password = document.getElementById("inputPassword5").value;


    if (!username || !password) return

    fetch(`${backendUrl}/login`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password,type: user_type }),
    })
    .then((res) => {
        if (!res.ok) throw new Error("Login failed: " + res.status);
        return res
    })
    .then((data) => {
        console.log('loggedin')
        navigate('/account')
        // Handle successful login, e.g., storing the token, redirecting, etc.
    })
    .catch((err) => {
        // Handle login failed, show user feedback
    });
}


export default () => {

    const navigate = useNavigate()
    const [isAuth, setAuth] = useState(false)
    const [user_type, setType] = useState('student_users')

    useEffect(() => {
        (async() =>{
            const isAuthCheck = await isAuthF()
            console.log(isAuthCheck)
            if(isAuthCheck) navigate('/account')
        })()
    }, [])

    return(
        !isAuth && <Container className='justify-content-md-center'>
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
        <Form className="mb-3">
            <Form.Check type='radio' checked={user_type=='student_users'} onChange={() => setType('student_users')} label={<span onClick={()=>setType('student_users')}>Student</span>} name="userRole" />
            <Form.Check type='radio' checked={user_type=='teacher_users'} onChange={() => setType('teacher_users')} label={<span onClick={()=>setType('teacher_users')}>Teacher</span>} name="userRole" />
        </Form>

        </div>
        <Row className="justify-content-md-center">
        <div className='text-center'>
                <Button type="button" className="btn btn-primary btn-lg" style = {
                    {backgroundColor : "skyblue", marginBottom : "0"}} onClick={()=>handleLogin(user_type, navigate)}>Login</Button>
            </div>
        </Row>

    </Container>
    )
}