import React from 'react';
import photo from "../imgs/f4965aa0b26d7b9c64a5fae7387adc6b.jpg";
import Button from "react-bootstrap/Button";

const Basket = () => {

  const device =   {id: 1, name: "Iphone 11 pro", price: 99999, rating: 5, img: photo }


    return (
        <main>
            <div className="basket">
                <div className="basket-labels">
                    <ul>
                        <li className="item item-heading">Item</li>
                        <li className="price">Price</li>
                    </ul>
                </div>
                <div className="basket-product">
                    <div className="item">
                        <div className="product-image">
                            <img src={device.img} alt="Placholder Image 2" className="product-frame"/>
                        </div>
                        <div className="product-details">
                            <p>Name - <span>{device.name}</span></p>
                            <p>Rating -  <span>{device.rating}</span></p>
                        </div>
                    </div>
                    <div className="price">{device.price}</div>
                    <div className="remove">
                        <Button variant="danger">Delete</Button>
                    </div>
                </div>
                <div className="basket-product">
                    <div className="item">
                        <div className="product-image">
                            <img src={device.img} alt="Placholder Image 2" className="product-frame"/>
                        </div>
                        <div className="product-details">
                            <p>Name - <span>{device.name}</span></p>
                            <p>Rating -  <span>{device.rating}</span></p>
                        </div>
                    </div>
                    <div className="price">{device.price}</div>
                    <div className="remove">
                        <Button variant="danger">Delete</Button>
                    </div>
                </div>
            </div>
            <aside>
                <div className="summary">
                    <div className="summary-total-items"><span className="total-items"></span> Items in your cart</div>
                    <div className="summary-total">
                        <div className="total-title">Total</div>
                        <div className="total-value final-value" id="basket-total">130.00</div>
                    </div>
                    <div className="summary-checkout">
                        <button className="checkout-cta">Go to Secure Checkout</button>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default Basket;