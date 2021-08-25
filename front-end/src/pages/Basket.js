import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import BasketItem from "../components/BasketItem"


const Basket = observer(() => {
    const [items, setItems] = useState([])
    const {device} = useContext(Context)

    useEffect(() => {
        const itemsInBasket = JSON.parse(localStorage.getItem("basket"))
        if(itemsInBasket !== null){
            setItems(itemsInBasket)
        } else {
            setItems(device.basket)
        }
    }, [])


    return (
        <main>
            <div className="basket">
                <div className="basket-labels">
                    <ul>
                        <li className="item item-heading">Item</li>
                        <li className="price">Price</li>
                    </ul>
                </div>
                {items.map(item => <BasketItem item = {item} key={item.id} setItems = {setItems}/>)}
            </div>
            <aside>
                <div className="summary">
                    <div className="summary-total-items">
                        <span className="total-items"></span>
                        {(items.length === 0) ? "no items in your shopping cart" : ''}
                        {items.length === 1 ? "1 item in your shopping cart" : ''}
                        {items.length > 1 ? `${items.length} items in your shopping cart` : ''}
                    </div>

                    <div className="summary-checkout">
                        <button className="checkout-cta">Go to Secure Checkout</button>
                    </div>
                </div>
            </aside>
        </main>
    );
})

export default Basket;