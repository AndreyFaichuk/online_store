import {observer} from "mobx-react-lite";
import {getOneDevice, removeFromCart} from "../requests_http/device_api";
import Button from "react-bootstrap/Button";
import React, {useContext} from "react";
import {Context} from "../index";

const BasketItem = observer(({item, setItems}) => {
    const {device} = useContext(Context)

    const removeItem = () => {
        removeFromCart(item.id).then(data => {
            device.setDevices(data)

            getOneDevice(item.id).then(data => {
                device.setRemoveFromBasket(data)
                setItems(device.basket)
            })
        })
    }

    return(
        <div className="basket-product">
            <div className="item">
                <div className="product-image">
                    <img src={process.env.REACT_APP_API_URL + item.img} alt="pic" className="product-frame"/>
                </div>
                <div className="product-details">
                    <p>Name - <span>{item.name}</span></p>
                    <p>Rating - <span>{item.rating}</span></p>
                </div>
            </div>
            <div className="price">{item.price}</div>
            <div className="remove">
                <Button variant="danger" onClick={removeItem}>Delete</Button>
            </div>
        </div>
    )
})

export default BasketItem
