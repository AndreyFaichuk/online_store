import React from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation} from "react-router-dom";
import {REGISTRATION_ROUTE, LOGIN_ROUTE} from "../utils/constants";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE


    return (
        <Container className="d-flex justify-content-center align-items-center" style = {{height: 500}}>
            <Card className="card-auth p-5">
                <Form className="d-flex flex-column align-items-center">
                    {
                        isLogin ?
                            <>
                        <h2>Authorization</h2>
                            <Form.Control placeholder="Enter email..." className="mt-3"/>
                            <Form.Control placeholder="Enter password..." className="mt-3"/>
                            </>
                            :
                            <>
                        <h2>Registration</h2>
                            <Form.Control placeholder="Enter name..." className="mt-3"/>
                            <Form.Control placeholder="Enter email..." className="mt-3"/>
                            <Form.Control placeholder="Enter phone..." className="mt-3"/>
                            <Form.Control placeholder="Enter password..." className="mt-3"/>
                            </>
                    }
                    <Row className="wrapper-auth">
                        {
                            isLogin ?
                            <div className="wrapper-auth-button">
                                Do not have an account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                            </div>
                            :
                            <div>
                                <div className="wrapper-auth-button">
                                    Do you have an account? <NavLink to={LOGIN_ROUTE}>Log in</NavLink>
                                </div>
                            </div>
                        }
                        <Button variant={"secondary"} className="btn-auth mt-3">{isLogin ? "Log in" : "Register"}</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Auth;