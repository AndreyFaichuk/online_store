import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../utils/constants";
import {observer} from "mobx-react-lite";
import logo from "../imgs/logo.PNG"
import cart from "../imgs/add-to-cart.png"
import {useHistory} from "react-router-dom";

const NavigationBar = observer(() => {

    const {user} = useContext(Context)
    const history = useHistory()

    console.log(user.IsAuth)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink className="logo" to={SHOP_ROUTE}> <img src={logo} alt={"logo"}/> </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {
                        user.IsAuth ?
                        <Nav className="ms-lg-auto">
                            <Button variant={"secondary"}>Log out</Button>
                            <Button variant={"secondary"} onClick={() => history.push(ADMIN_ROUTE)}>Admin dashboard</Button>
                            <img id="cart-icon" src={cart} alt={"cart"} onClick={() => history.push(BASKET_ROUTE)}/>
                        </Nav>
                        :
                        <Nav className="ms-lg-auto">
                            <Button variant={"secondary"} onClick={() => history.push(LOGIN_ROUTE)}>Authorization</Button>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
})

export default NavigationBar;