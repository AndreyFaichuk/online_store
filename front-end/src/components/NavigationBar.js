import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../utils/constants";
import {observer} from "mobx-react-lite";
import logo from "../imgs/logo.PNG"
import {useHistory} from "react-router-dom";
import {allDevices} from "../requests_http/device_api";


const NavigationBar = observer(() => {

    const {user, device} = useContext(Context)
    const history = useHistory()

 const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem("token")
        history.push(SHOP_ROUTE)
 }

 const allItems = () => {
     allDevices(null, null, 1, device.limit).then(data => {
         device.setDevices(data.rows)
         device.setTotalCount(data.count)
         device.setSelectedType({})
         device.setSelectedBrand({})
     })
 }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <NavLink className="logo" to={SHOP_ROUTE}>  <img src={logo} alt={"logo"} onClick={allItems}/> </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {
                        user.IsAuth ?
                        <Nav className="ms-lg-auto">
                            <Button variant={"secondary"} onClick={logOut}>Log out</Button>
                            <Button variant={"secondary"}
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                    disabled={user.user.role === "ADMIN" ? false : true}
                            >{user.user.role === "ADMIN" ? "Admin dashboard" : "Access only for admin"}</Button>

                          <Button variant={"secondary"} onClick={() => history.push(BASKET_ROUTE)}>Basket</Button>

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