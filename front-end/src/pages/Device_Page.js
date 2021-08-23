import React, {useEffect, useState} from 'react';
import photo from "../imgs/f4965aa0b26d7b9c64a5fae7387adc6b.jpg";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom"
import {getOneDevice} from "../requests_http/device_api";
import {Spinner} from "react-bootstrap";
import Zoom from 'react-img-zoom'



const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const [loading, setLoading] = useState(true)

    const {id} = useParams()


    useEffect(() => {
        getOneDevice(id)
            .then(data => setDevice(data))
            .finally(() => setLoading(false))
    },[])


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
                        img={process.env.REACT_APP_API_URL + device.img}
                        zoomScale={3}
                        width={550}
                        height={350}
                        transitionTime={0.3}
                    />
                </div>

                <div className="line-modal"></div>

                <div className="more_info">
                    <h4>Characteristics:</h4>
                    {device.info.map((info) =>
                        <p key={info.id}>
                            {info.title} : {info.description}
                        </p>
                    )}
                </div>

                <div className="line-modal"></div>
                <div className="buttonToCart">
                    <h4>Price: ${device.price}</h4>
                    <Button variant={"secondary"} className="cart_button">Add to cart</Button>
                </div>
            </div>
            }
        </>
    );
};

export default DevicePage;