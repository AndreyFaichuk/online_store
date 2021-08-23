import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/constants";
import ratingPNG from "../imgs/favourite.png"
import ratingChecked from "../imgs/star_checked.png"
import {rating} from "../requests_http/device_api";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const DeviceCard = observer(({devices}) => {
    const [checked, setChecked] = useState(false)

    const {device, user} = useContext(Context)

    let items = []

    const setRating = () => {
        rating(devices.id, device.page).then(data => {
            device.setDevices(data)
            checked ? setChecked(false) : setChecked(true)

            let array = JSON.parse(localStorage.getItem("checked"))
        })

    }
    const history = useHistory()

    return (
        <div className="product-wrap">
            <div className="product-item">
                <img src={process.env.REACT_APP_API_URL + devices.img}/>
                    <div className="product-buttons">
                        <button type="button" className="button" onClick={() => history.push(DEVICE_ROUTE + "/" + devices.id)}>More info</button>
                    </div>
            </div>
            <div className="product-title" onClick={() => history.push(DEVICE_ROUTE + "/" + devices.id)}>
                <div className="qqq">
                    <h5>{devices.name}</h5>
                    <div className="line"></div>
                </div>
                <span className="product-price">$ {devices.price}</span>
            </div>
            {user.IsAuth ?
                <div className="rating">
                    <h5>rating: {devices.rating}</h5>
                    <img src={checked ? ratingChecked : ratingPNG} onClick={setRating}/>
                </div>
            : ''}
        </div>
    );
})

export default DeviceCard;