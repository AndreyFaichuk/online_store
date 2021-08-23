import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Col, Dropdown, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap-floating-label";
import {Context} from "../../index";
import {allBrands, allTypes, createDevice} from "../../requests_http/device_api";
import {observer} from "mobx-react-lite";

const ModalDevice = observer(({show, onHide}) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])


    useEffect(() =>  {
        allTypes().then(data => device.setIsTypes(data))
        allBrands().then(data => device.setBrands(data))
    },[])


    const addCharacteristic = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeCharacteristic = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInformation = (key, val, num) => {     /*key - title or description, */
        setInfo(info.map(i => i.number === num ? {...i, [key]: val} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const form_data = new FormData()
        form_data.append('name', name)
        form_data.append('price', `${price}`)
        form_data.append('img', file)
        form_data.append('brandId', device.selectedBrand.id)
        form_data.append('typeId', device.selectedType.id)
        form_data.append('info', JSON.stringify(info))
        createDevice(form_data).then(() => onHide())
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
                        <Dropdown.Toggle id="dropdown-button-dark-example1"
                                         variant="secondary">
                            {device.selectedType.name || "choose a type"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-dark-example1"
                                         variant="secondary">
                            {device.selectedBrand.name || "choose a brand"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>

                    <div className="inputs-device">

                        <FloatingLabel controlId="floatingPassword" label="enter name of device"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        >
                            <Form.Control type="text" placeholder="Password" />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="enter price of device" type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        >
                            <Form.Control type="text" placeholder="Password" />
                        </FloatingLabel>

                        <Form.Control type="file" onChange={selectFile}>

                        </Form.Control>
                    </div>
                    <hr/>
                    <div className="button-add">
                     <Button variant="info" className="btn btn-success" md={6} onClick={addCharacteristic}>Add a new characteristic</Button>
                    </div>
                    {info.map(inf =>
                        <Row className="mt-4" key={inf.number}>
                            <Col md={4}>
                                <FloatingLabel
                                    label="name of characteristic"
                                    value={inf.title}
                                    onChange={e => changeInformation("title", e.target.value, inf.number)}
                                >
                                    <Form.Control type="text" placeholder="Password" />
                                </FloatingLabel>
                            </Col>

                            <Col md={4}>
                                <FloatingLabel
                                    label="description of characteristic"
                                    value={inf.description}
                                    onChange={e => changeInformation("description", e.target.value, inf.number)}
                                >
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
                <Button variant="success" onClick={addDevice}>Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default ModalDevice;