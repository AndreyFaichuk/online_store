import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap-floating-label";

const ModalBrand = ({show, onHide}) => {
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
                    <FloatingLabel controlId="floatingPassword" label="enter name of brand">
                        <Form.Control type="text" placeholder="Password" />
                    </FloatingLabel>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success">Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalBrand;