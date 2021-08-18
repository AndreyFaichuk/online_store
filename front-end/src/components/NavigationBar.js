import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import {NavLink} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/constants";
import {observer} from "mobx-react-lite";
import logo from "../imgs/logo.PNG"

const NavigationBar = observer(() => {

    const {user} = useContext(Context)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink className="logo" to={SHOP_ROUTE}> <img src={logo} alt={"logo"}/> </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {
                        user._isAuth ?
                        <Nav className="ms-lg-auto">
                            <Button variant={"secondary"}>Log in</Button>
                            <Button variant={"secondary"}>Admin dashboard</Button>
                        </Nav>
                        :
                        <Nav className="ms-lg-auto">
                            <Button variant={"secondary"} onClick={() => user.setIsAuth(true)}>Authorization</Button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
})

export default NavigationBar;