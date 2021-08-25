import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/constants";
import like from "../imgs/like.png"
import available from "../imgs/checked.png"
import notAvailable from "../imgs/cancel.png"
import {addRating} from "../requests_http/device_api";
import {removeRating} from "../requests_http/device_api";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const DeviceCard = observer(({devices}) => {

    const {device, user} = useContext(Context)
    const history = useHistory()

    const setRating = () => {
        const switchs =  JSON.parse(localStorage.getItem("switch"))
           if (switchs === false){
           removeRating(devices.id, device.page, device.selectedType.id, device.selectedBrand.id).then(data => {
               device.setDevices(data.rows)
               device.setTotalCount(data.count)
               localStorage.setItem("switch", JSON.stringify(true))
           })
           } else if (switchs === null || switchs === true) {
               addRating(devices.id, device.page, device.selectedType.id, device.selectedBrand.id).then(data => {
                   device.setDevices(data.rows)
                   device.setTotalCount(data.count)
                   localStorage.setItem("switch", JSON.stringify(false))
               })
           }
    }

    return (
        <div className="product-wrap">
            <div className="product-item">
                <img src={process.env.REACT_APP_API_URL + devices.img}/>
                    <div className="product-buttons">
                        <button type="button"
                                className="button"
                                onClick={() => history.push(DEVICE_ROUTE + "/" + devices.id)}>More info</button>
                    </div>
            </div>
            <div className="product-title" onClick={() => history.push(DEVICE_ROUTE + "/" + devices.id)}>
                <div className="qqq">
                    <h5>{devices.name}</h5>

                    <div className="name-and-available">
                        {
                            devices.isReserved ?
                                <>
                                    <span>not available now!</span>
                                    <img id="available" src={notAvailable}/>
                                </>
                                :
                                <>
                                    <span>available now!</span>
                                    <img id="available" src={available}/>
                                </>
                        }

                    </div>
                    <div className="line"></div>
                </div>
                <span className="product-price">$ {devices.price}</span>
            </div>
            {user.IsAuth ?
                <div className="rating">
                    <h5>rating: {devices.rating}</h5>
                    <img src={like} onClick={setRating}/>
                </div>
            : ''}
        </div>
    );
})

export default DeviceCard;