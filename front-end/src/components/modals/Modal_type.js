import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";
import FloatingLabel from "react-bootstrap-floating-label";
import {createTypes} from "../../requests_http/device_api";

const ModalType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createTypes({name: value}).then(data => {
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
                   Add a new type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="inputs-modal">
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="enter name of type"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    >
                        <Form.Control type="text"  />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={addType}>Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalType;