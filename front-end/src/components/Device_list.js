import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Row from "react-bootstrap/Row";
import DeviceCard from "./Device_card";


const DeviceList = observer(() => {
    const {device} = useContext(Context)


    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                    <DeviceCard key={device.id} devices={device}/>
                )}
        </Row>
    );
})

export default DeviceList;