import React, {useContext, useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom"
import {addToCart, getOneDevice} from "../requests_http/device_api";
import {Spinner} from "react-bootstrap";
import Zoom from 'react-img-zoom'
import {observer} from "mobx-react-lite";
import notAvailable from "../imgs/cancel.png";
import available from "../imgs/checked.png";
import {Context} from "../index";



const DevicePage = observer(() => {
    const {device, user} = useContext(Context)
    const [deviceOne, setDeviceOne] = useState({info: []})
    const [loading, setLoading] = useState(true)

    const {id} = useParams()


    useEffect(() => {
        getOneDevice(id)
            .then(data => setDeviceOne(data))
            .finally(() => setLoading(false))
    },[device.devices])

    const AddCart = () => {
        addToCart(id, user.user.id).then(data => {
            device.setDevices(data)
        })
        getOneDevice(id).then(data => {
                    device.setIsBasket(data)
        })
    }

    return (
        <>
            {
                loading &&

            <div className="wrapp-spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
            </div>
            }
            {
                loading ? "" :  <div className="device_modal">
                <div className="img_div">
                    <Zoom
                        img={process.env.REACT_APP_API_URL + deviceOne.img}
                        zoomScale={3}
                        width={550}
                        height={350}
                        transitionTime={0.3}
                    />
                </div>

                <div className="line-modal"></div>

                <div className="more_info">
                        <div className="name-and-available">
                    {
                        deviceOne.isReserved ?
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

                    <h4>Characteristics:</h4>
                    {deviceOne.info.map((info) =>
                        <p key={info.id}>
                            {info.title} : {info.description}
                        </p>
                    )}
                </div>

                <div className="line-modal"></div>
                <div className="buttonToCart">
                    <h4>Price: ${deviceOne.price}</h4>
                    {user._isAuth ?

                        <Button variant={"secondary"}
                                className="cart_button"
                                onClick={AddCart}
                                disabled={deviceOne.isReserved ? true : false}
                        >Add to cart</Button>

                        :

                        <h5>log in, please! You can`t buy this item now!</h5>
                    }
                </div>
            </div>
            }
        </>
    );
})

export default DevicePage;