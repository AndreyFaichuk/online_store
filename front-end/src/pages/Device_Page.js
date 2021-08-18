import React from 'react';
import photo from "../imgs/f4965aa0b26d7b9c64a5fae7387adc6b.jpg";
import Button from "react-bootstrap/Button";


const DevicePage = () => {

    const device = {id: 1, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo }

    return (
       <div className="device_modal">
           <div className="img_div">
               <img src={device.img} alt=""/>
           </div>

           <div className="more_info">
                   <p>Name: </p>
                   <p>Rating:</p>
           </div>
           <div className="buttonToCart">
               <h4>Price:</h4>
               <Button variant={"secondary"} className="cart_button">Add to cart</Button>
           </div>
       </div>
    );
};

export default DevicePage;