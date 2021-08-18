import React from 'react';
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/constants";

const DeviceCard = ({device}) => {

    const history = useHistory()

    return (
        <div className="product-wrap">
            <div className="product-item">
                <img src={device.img}/>
                    <div className="product-buttons">
                        <button type="button" className="button" onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}>More info</button>
                    </div>
            </div>
            <div className="product-title" onClick={() => history.push(DEVICE_ROUTE + "/" + device.id)}>
                <div>
                    <h5>{device.name}</h5>
                </div>
                <span className="product-price">$ {device.price}</span>
            </div>
        </div>
    );
};

export default DeviceCard;