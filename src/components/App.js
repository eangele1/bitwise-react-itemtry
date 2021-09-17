import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./home";
import CartPage from './cart';
import ProductsPage from "./products";
import ProductDetailsPage from "./product-details";
import CheckOutPage from "./checkout";
import SignInPage from "./signin";
import RegisterPage from "./register";

import { AuthContext } from '../context/AuthContext.js';
import { CartContext } from '../context/CartContext.js';
import PrivateRoute from './PrivateRoute.js';
import PublicRoute from './PublicRoute.js';
import { login, saveUserCart } from "../utilities/auth.js";

function App() {

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'LOGIN':
        let result = login(payload.user.email, payload.user.password);

        if (result !== null) {
          setUser(result);

          if(result.cart.length === 0 && cart.length !== 0){
            saveUserCart(result.email, cart);
            setCart(cart);
          }
          else {
            setCart(result.cart);
          }

          return true;
        }
        else {
          return false;
        }
        
      case 'LOGOUT':
        setUser(null);
        setCart([]);
        return;
      default:
        return;
    }
  }

  const dispatchCartEvent = (actionType, payload) => {
    switch (actionType) {
      case 'ADD':
        let objIdx = cart.findIndex((item => item.id === payload.item.id));

        if(objIdx !== -1){
          setCart(cart.map(x => {
            if(x.id !== payload.item.id) return x
            return {...x, quantity: x.quantity + payload.item.quantity}
          }));
          if(user) saveUserCart(user.email, cart.map(x => {
            if(x.id !== payload.item.id) return x
            return {...x, quantity: x.quantity + payload.item.quantity}
          }));
        }
        else{
          setCart([...cart, payload.item]);
          if(user) saveUserCart(user.email, [...cart, payload.item]);
        }
        return;
      case 'UPDATE':
        setCart(cart.map(x => {
          if(x.id !== payload.item.id) return x
          return {...x, quantity: payload.item.quantity}
        }));
        if(user) saveUserCart(user.email, cart.map(x => {
          if(x.id !== payload.item.id) return x
          return {...x, quantity: payload.item.quantity}
        }));
        return;
      case 'REMOVE':
        setCart(cart.filter(item => item.id !== payload.item.id));
        if(user) saveUserCart(user.email, cart.filter(item => item.id !== payload.item.id));
        return;
      case 'CLEAR':
        setCart([]);
        let emptyCart = [];
        if(user) saveUserCart(user.email, emptyCart);
        return;
      default:
        return;
    }
  }

  return (
    <div className="app">
      <AuthContext.Provider value={{ user, dispatchUserEvent }}>
        <CartContext.Provider value={{ cart, dispatchCartEvent }}>
          <Router>
            <Switch>
              <PublicRoute restricted={false} component={HomePage} path="/" exact />
              <PublicRoute restricted={false} component={SignInPage} path="/signin" exact />
              <PublicRoute restricted={false} component={RegisterPage} path="/register" exact />
              <PublicRoute restricted={false} component={CartPage} path="/cart" exact />
              <PublicRoute restricted={false} component={ProductDetailsPage} path="/products/details/:id" exact />
              <PublicRoute
                restricted={false}
                component={ProductsPage}
                path={["/products", "/products/:category", "/products/:category/:input"]}
                exact />
              <PrivateRoute component={CheckOutPage} path="/checkout" exact />
            </Switch>
          </Router>
        </CartContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;