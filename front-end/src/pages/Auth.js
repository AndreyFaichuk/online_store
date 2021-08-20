import React, {useContext, useState} from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {login, registration} from "../requests_http/user_api";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import FloatingLabel from "react-bootstrap-floating-label";
import AlertDismissibleExample from "../components/modals/Error_auth"
import Success from "../components/modals/Success_auth"

const Auth = observer(() => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [showError, setShowError] = useState()
    const [showSuccess, setShowSuccess] = useState()
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE

    const regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm
    const regexForPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/img
    const regexForPassword = /^[0-9]{6,}$/img
    const regexForName = /^\w{1,}$/img

    const cleaner = () => {
        setShowError('')
        setShowSuccess('')
    }


    const regAndAuth = async () => {
            try{
                let data

                if(isLogin){

                    email.match(regexForEmail) ? setEmailError(false) : setEmailError(true)
                    password.match(regexForPassword) ? setPasswordError(false) : setPasswordError(true)

                    if(email.match(regexForEmail) && password.match(regexForPassword)){
                        data = await login(email, password)

                        if(data) {
                            user.setUser(user)
                            user.setIsAuth(true)
                            setEmail('')
                            setPassword('')
                            setShowSuccess("logged in")
                            setTimeout(cleaner, 2000)
                            setTimeout(() => history.push(SHOP_ROUTE), 2000)
                        }
                    }

                } else {

                    email.match(regexForEmail) ? setEmailError(false) : setEmailError(true)
                    phone.match(regexForPhone) ? setPhoneError(false) : setPhoneError(true)
                    name.match(regexForName) ? setNameError(false) : setNameError(true)
                    password.match(regexForPassword) ? setPasswordError(false) : setPasswordError(true)

                    if(email.match(regexForEmail) && phone.match(regexForPhone) && name.match(regexForName) && password.match(regexForPassword)){

                      data = await registration(email, password, phone, name)

                      if(data){
                          user.setUser(user)
                          user.setIsAuth(true)
                          setShowSuccess("registered")
                          setEmail('')
                          setName('')
                          setPhone('')
                          setPassword('')
                          setTimeout(cleaner, 3000)
                      }
                    }
                }
            } catch (e) {
                setShowError(e.response.data.message)
                setTimeout(cleaner, 3000)
            }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style = {{height: 500}}>
            {showError ? <AlertDismissibleExample errorMessage = {showError}/> : ''}
            {showSuccess ? <Success successMessage = {showSuccess}/> : ''}
            <Card className="card-auth p-5">
                <Form className="form-registration">
                    {
                        isLogin ?
                            <>
                        <h2>Authorization</h2>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Enter email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}>
                                    <Form.Control/>
                                </FloatingLabel>
                                {emailError ? <h4 className="inputs-error">invalid value of email! Try again please</h4> : ''}

                                <FloatingLabel
                                    type="password"
                                    controlId="floatingPassword"
                                    label="Enter password..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}>
                                    <Form.Control/>
                                </FloatingLabel>
                                {passwordError ? <h4 className="inputs-error">password must be at least 6 letters</h4> : ''}
                            </>
                            :
                            <>
                        <h2>Registration</h2>
                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Enter name..."
                                    value={name}
                                    onChange={e => setName(e.target.value)}>
                                    <Form.Control/>
                                </FloatingLabel>

                                {nameError ? <h4 className="inputs-error">name field must not be empty</h4> : ''}

                                <FloatingLabel
                                    controlId="floatingPassword"
                                    label="Enter email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}>
                                    <Form.Control/>
                                </FloatingLabel>

                                {emailError ? <h4 className="inputs-error">invalid value of email! Try again please</h4> : ''}

                                <FloatingLabel
                                    type="number"
                                    controlId="floatingPassword"
                                    label="Enter phone..."
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}>
                                    <Form.Control/>
                                </FloatingLabel>

                                {phoneError ? <h4 className="inputs-error">invalid value of phone number! Try again please</h4> : ''}

                                <FloatingLabel
                                    type="password"
                                    controlId="floatingPassword"
                                    label="Enter password..."
                                    value={password} onChange={e => setPassword(e.target.value)}>
                                    <Form.Control/>
                                </FloatingLabel>

                                {passwordError ? <h4 className="inputs-error">password must be at least 6 letters</h4> : ''}
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
                        <Button variant={"secondary"} className="btn-auth mt-3" onClick={regAndAuth}>{isLogin ? "Log in" : "Register"}</Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;