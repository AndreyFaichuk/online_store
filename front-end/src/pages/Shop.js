import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Types from "../components/Types";
import ListGroup from "react-bootstrap/ListGroup";
import Brands from "../components/Brands";
import Device_list from "../components/Device_list";


const Shop = () => {
    return (
       <Container>
           <Row className="brandAndType">
               <Col md={2}>
                   <Types/>
                   <Brands/>
               </Col>

               <Col md={9} className="listOfDevices">
                   <Device_list/>
               </Col>
           </Row>

       </Container>
    );
};

export default Shop;