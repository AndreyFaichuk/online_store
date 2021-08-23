import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap-floating-label";
import {createBrands} from "../../requests_http/device_api";

const ModalBrand = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrands({name: value}).then(data => {
            setValue('')
            onHide()
        })
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
                    Add a new brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="inputs-modal">
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="enter name of brand"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    >
                        <Form.Control type="text" />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={addBrand}>Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBrand;