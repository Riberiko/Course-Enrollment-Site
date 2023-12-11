import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Image } from "react-bootstrap";
import {isAuthF} from '../helper'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function handleLogin(user_type, navigate, rememberMe){
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
    .then(() => {
        if(rememberMe){
            localStorage.setItem('username', document.getElementById("inputUsername").value)
            localStorage.setItem('password', document.getElementById("inputPassword5").value)
        } else{
            localStorage.clear()
        }
        navigate('/account')
        // Handle successful login, e.g., storing the token, redirecting, etc.
    })
    .catch((err) => {
        // Handle login failed, show user feedback
        console.log(err)
    });
}


export default () => {

    const navigate = useNavigate()
    const [isAuth, setAuth] = useState(false)
    const [user_type, setType] = useState('student_users')
    const [rememberMe, setRemeberMe] = useState(localStorage.getItem('username')&&localStorage.getItem('password') || false)

    useEffect(() => {
        (async() =>{
            try{
                const isAuthCheck = await isAuthF();
                navigate('/account')
            }catch (err)
            {
                if(localStorage.getItem('password')&&localStorage.getItem('username'))
                {
                    document.getElementById("inputPassword5").value = localStorage.getItem('password')
                    document.getElementById("inputUsername").value = localStorage.getItem('username')
                }
            }
        })();
    }, []);

    return (
        !isAuth && 
        <Container>
            <Row className="justify-content-md-center mt-3">
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
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Form>
                        <Form.Check 
                            type='radio' 
                            checked={user_type === 'student_users'} 
                            onChange={() => setType('student_users')} 
                            label={<span onClick={() => setType('student_users')} >Student</span>} 
                            name="userRole" 
                        />
                        <Form.Check 
                            type='radio' 
                            checked={user_type === 'teacher_users'} 
                            onChange={() => setType('teacher_users')} 
                            label={<span onClick={() => setType('teacher_users')} >Teacher</span>} 
                            name="userRole" 
                        />
                        <Form.Check 
                            type='checkbox'
                            checked={rememberMe}
                            onChange={() => setRemeberMe(!rememberMe)}
                            label={<span onClick={()=> setRemeberMe(!rememberMe)}>Remember Me</span>} 
                            name="userRole" 
                        />
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-3">
                <Col md="auto">
                    <Button 
                        type="button" 
                        className="btn-primary btn-lg" 
                        style={{ backgroundColor : "skyblue" }} 
                        onClick={() => handleLogin(user_type, navigate, rememberMe)}
                    >
                        Login
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}