import React, { useContext } from 'react';
import './CheckOut.css';
import logo from '../../logo.png';

import { useHistory } from 'react-router-dom';
import { CartContext } from '../../context/CartContext.js';

const CheckOut = () => {

  const { cart, dispatchCartEvent } = useContext(CartContext);
  const history = useHistory();

  const handleReturn = () => {
    dispatchCartEvent('CLEAR', null);
    window.scrollTo(0,0);
    history.push("/");
  }

  return (
    <div id="checkout-page">

      <center><img alt="_logo" onClick={() => history.push("/cart")} style={{ cursor: "pointer", width: "100%", maxWidth: "250px", padding: "20px 0" }} src={logo} /></center>

      <div class="checkout-row">
        <div class="col-75">
          <div class="checkout-container">
            <form>

              <div class="checkout-row">

                <div class="col-50">
                  <h3 style={{ marginBottom: "0" }}>Payment</h3>
                  <img alt="_creditcards" style={{ maxWidth: "300px", width: "100%" }} src="https://autoshippinggroup.com/wp-content/uploads/2016/12/credit-cards.png" />
                  <label className="checkout-label" for="cname">Name on Card</label>
                  <input className="checkout-input" type="text" id="cname" name="cardname" placeholder="John More Doe" />
                  <label className="checkout-label" for="ccnum">Credit Card Number</label>
                  <input className="checkout-input" type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                  <label className="checkout-label" for="expmonth">Exp. Month</label>
                  <input className="checkout-input" type="text" id="expmonth" name="expmonth" placeholder="November" />
                  <div class="checkout-row">
                    <div class="col-50">
                      <label className="checkout-label" for="cvv">CVV</label>
                      <input className="checkout-input" type="text" id="cvv" name="cvv" placeholder="123" />
                    </div>
                    <div class="col-50">
                      <label className="checkout-label" for="expyear">Exp. Year</label>
                      <input className="checkout-input" type="text" id="expyear" name="expyear" placeholder="YYYY" />
                    </div>

                  </div>
                </div>

                <div class="col-50">
                  <h3 style={{ margin: "15px 0px" }}>Shipping Address</h3>
                  <label className="checkout-label" for="fname">Full Name</label>
                  <input className="checkout-input" type="text" id="fname" name="firstname" placeholder="First Last" />
                  <label className="checkout-label" for="adr">Address</label>
                  <input className="checkout-input" type="text" id="adr" name="address" placeholder="123 Sample Street" />
                  <label className="checkout-label" for="city">City</label>
                  <input className="checkout-input" type="text" id="city" name="city" placeholder="California" />

                  <div class="checkout-row">
                    <div class="col-50">
                      <label className="checkout-label" for="zip">Zip</label>
                      <input className="checkout-input" type="text" id="zip" name="zip" placeholder="10001" />
                    </div>
                    <div class="col-50">
                      <label className="checkout-label" for="state">State</label>
                      <input className="checkout-input" type="text" id="state" name="state" placeholder="CA" />
                    </div>
                  </div>
                </div>

              </div>
              <input onClick={() => handleReturn()} className="checkout-input" type="submit" value="Place Order" class="order-btn" />
            </form>
          </div>
        </div>
        <div class="col-25">
          <div class="checkout-container">
            <br />

            {cart.map((item, index) => (
              <div key={index}>
                <div class="products-list">
                  <p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "50vw" }}>{item.title}</p>
                  <p>${item.price}</p>
                </div>
                <br />
              </div>
            ))}

            <hr />
            <br />
            <p>Subtotal: <span class="price">${(cart.reduce((n, {price, quantity}) => n + price * quantity, 0))}</span></p>
            <br />
            <p>Shipping Total: <span class="price">${(cart.length * 1.99).toFixed(2)}</span></p>
            <br />
            <p>Tax: <span class="price">${(cart.reduce((n, {price, quantity}) => n + price * quantity, 0) * 0.0725).toFixed(2)}</span></p>
            <br />
            <p>Grand Total: <span class="price">${((cart.reduce((n, {price, quantity}) => n + price * quantity, 0)) + (cart.length * 1.99) + (cart.reduce((n, {price, quantity}) => n + price * quantity, 0) * 0.0725)).toFixed(2)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;