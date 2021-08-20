import React from 'react';
import photo from "../imgs/f4965aa0b26d7b9c64a5fae7387adc6b.jpg";
import Button from "react-bootstrap/Button";


const DevicePage = () => {

    const device = {id: 1, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo}

    const description = [
        {id:1, title:"Memory", description:"5 gb"},
        {id:2, title:"Camera", description:"12 mpx"},
        {id:3, title:"CPU", description:"A1"},
        {id:4, title:"Color", description:"Yellow"},
        {id:5, title:"Battery", description:"5000 mah"}
    ]

    return (
       <div className="device_modal">
           <div className="img_div">
               <img src={device.img} alt=""/>
           </div>

           <div className="more_info">
               <h4>Characteristics:</h4>
               {description.map((info) =>
                   <p key={info.id}>
                       {info.title} : {info.description}
                   </p>
               )}
           </div>
           <div className="buttonToCart">
               <h4>Price:</h4>
               <Button variant={"secondary"} className="cart_button">Add to cart</Button>
           </div>
       </div>
    );
};

export default DevicePage;