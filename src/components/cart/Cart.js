import React, { useEffect, useState, useContext } from 'react';
import Header from "../header/Header.js";
import Footer from "../footer/Footer.js";
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.js';
import './Cart.css';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

const Cart = () => {

  const { cart, dispatchCartEvent } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});
  const history = useHistory();

  const handleUpdateItem = (item) => {
    item.quantity = quantities[item.id];
    dispatchCartEvent('UPDATE', { item: item });
  }

  const handleRemoveItem = (item) => {
    dispatchCartEvent('REMOVE', { item: item });
  }

  // will only run once
  useEffect(() => {
    let obj = {};
    cart.forEach(item => {
      Object.assign(obj, {[item.id]: item.quantity});
    });
    setQuantities(obj);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div id="cart">
        <div className="cart-row">

          <div className="cart-column2" style={{ fontFamily: "Helvetica" }}>
            {cart.length > 0 ? cart.map((item, index) => (
              <div key={index} style={{ padding: "20px 0", display: "flex" }}>
                <img alt="_item" style={{ padding: "0px 30px", width: "100px", height: "100%" }} src={item.image} />
                <div>
                  <h3 onClick={() => history.push(`/products/details/${item.id}`)} style={{ cursor: "pointer", paddingRight: "10px" }}>{item.title}</h3>
                  {Array(Math.round(item.rating.rate))
                    .fill()
                    .map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  <span>{` (${item.rating.count})`}</span>
                  <p style={{ color: "green" }} >In Stock</p>
                </div>
                <div style={{ margin: "0 0 0 auto", paddingRight: "30px" }}>
                  <p>${item.price}</p>
                  <div className="counter">
                  { item.quantity !== quantities[item.id] ? <PublishRoundedIcon style={{ cursor: "pointer", fontSize: "25px" }} onClick={() => handleUpdateItem(item)} /> : <></> }
                    <span onClick={() => { quantities[item.id] > 1 ? setQuantities(prevState => ({...prevState, [item.id]: quantities[item.id] - 1})) : console.log("Go up dummy.") }}>-</span>
                    <input type="text" readOnly={true} value={String(quantities[item.id])} />
                    <span onClick={() => { quantities[item.id] >= 1 ? setQuantities(prevState => ({...prevState, [item.id]: quantities[item.id] + 1})) : console.log("You can't s-see me, c-can you?...") }}>+</span>
                  </div>
                  <button onClick={() => handleRemoveItem(item) } id="cart-remove-button" type="button">Remove</button>
                </div>
              </div>
            )) : <h3 style={{ textAlign: "center" }}>Your shopping cart is empty.</h3>}
          </div>

          <div className="cart-column1" style={{ fontFamily: "Helvetica" }}>
            <h2 style={{ paddingBottom: "50px" }}>Summary</h2>
            <p>Shipping Total: </p> <p style={{ float: 'right' }}>${(cart.length * 1.99).toFixed(2)}</p> <br />
            <p>Sales Tax: </p> <p style={{ float: 'right' }}>${(cart.reduce((n, {price, quantity}) => n + price * quantity, 0) * 0.0725).toFixed(2)}</p> <br />
            <p>Total: </p> <p style={{ float: 'right' }}>${((cart.reduce((n, {price, quantity}) => n + price * quantity, 0)) + (cart.length * 1.99) + (cart.reduce((n, {price, quantity}) => n + price * quantity, 0) * 0.0725)).toFixed(2)}</p> <br />
            <button onClick={() => history.push("/checkout")} disabled={cart.length <= 0} id="checkout-button">Checkout</button>
          </div>

        </div>
      </div>
      <Footer>©2021 Itemtry is owned and operated by Ezer Angeles under an MIT License.<br />The owner is not responsible on any aspects of your purchases since you cannot actually purchase anything here.</Footer>
    </>
  );
}

export default Cart;