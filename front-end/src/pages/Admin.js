import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal_type from "../components/modals/Modal_type";
import Modal_brand from "../components/modals/Modal_brand";
import Modal_device from "../components/modals/Modal_device";

const Admin = () => {
    const [visibeBrand, setVisibleBrand] = useState(false)
    const [visibeType, setVisibleType] = useState(false)
    const [visibeDevice, setVisibleDevice] = useState(false)


    return (
        <>
        <div className="admin-modal">
            <Button variant="dark" onClick={() => setVisibleType(true)}>Add new type</Button>

            <div className="arrow-2">
                <div className="arrow-2-top"></div>
                <div className="arrow-2-bottom"></div>
            </div>

            <Button variant="dark"onClick={() => setVisibleBrand(true)} >Add new brand</Button>

            <div className="arrow-2">
                <div className="arrow-2-top"></div>
                <div className="arrow-2-bottom"></div>
            </div>

            <Button variant="dark" onClick={() => setVisibleDevice(true)}>Add new device</Button>
        </div>
            <Modal_type show={visibeType} onHide={() => setVisibleType(false)}/>
            <Modal_brand show={visibeBrand} onHide={() => setVisibleBrand(false)}/>
            <Modal_device show={visibeDevice} onHide={() => setVisibleDevice(false)}/>
        </>
    );
};

export default Admin;