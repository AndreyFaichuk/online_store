import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Col, Dropdown, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap-floating-label";
import {Context} from "../../index";

const ModalDevice = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    const addCharacteristic = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeCharacteristic = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    return (
        <Modal
            show={show}
            onHide = {onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="inputs-modal">
                    <div className="dropdowns">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">choose a type</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">choose a brand</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    <div className="inputs-device">

                        <FloatingLabel controlId="floatingPassword" label="enter name of device">
                            <Form.Control type="text" placeholder="Password" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="enter price of device" type="number">
                            <Form.Control type="text" placeholder="Password" />
                        </FloatingLabel>

                        <Form.Control type="file"></Form.Control>
                    </div>
                    <hr/>
                    <div className="button-add">
                     <Button variant="info" className="btn btn-success" md={6} onClick={addCharacteristic}>Add a new characteristic</Button>
                    </div>
                    {info.map(inf =>
                        <Row className="mt-4" key={inf.number}>
                            <Col md={4}>
                                <FloatingLabel controlId="floatingPassword" label="name of characteristic">
                                    <Form.Control type="text" placeholder="Password" />
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel controlId="floatingPassword" label="description of characteristic">
                                    <Form.Control type="text" placeholder="Password" />
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <Button variant="danger" onClick={() =>removeCharacteristic(inf.number)}>Delete</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success">Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDevice;