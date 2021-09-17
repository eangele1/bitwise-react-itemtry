import React, { useState, useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import logo from '../../logo.png';
import { useHistory } from "react-router-dom";
import './Header.css';

import { AuthContext } from '../../context/AuthContext.js';
import { CartContext } from '../../context/CartContext.js';

const Header = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [productCategory, setProductCategory] = useState("all");

  const history = useHistory();
  const { user, dispatchUserEvent } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/products/${productCategory}/${searchTerm}`);
  }

  const handleUserLogout = () => {
    dispatchUserEvent('LOGOUT', null);
    history.push('/signin');
  }

  //FOR FUN: lets user use the enter key to submit the value given in the input
  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch(e);
    }
  };

  return (
    <>
      <div className="header">

        <img
          onClick={() => history.push('/')}
          className="header__logo"
          src={logo}
          alt="amazon_clone"
        />

        <div className="header__search">
          <div className="select_style">
            <select onChange={(e) => setProductCategory(e.target.value)} value={productCategory}>
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>
          <input
            className="header__searchInput"
            type="text"
            placeholder="Search"
            onKeyDown={keyPress}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="header__searchIcon" onClick={(e) => handleSearch(e)} />
        </div>

        <div className="header__nav">
          <div onClick={() => {if(user !== null) handleUserLogout(); else history.push('/signin');}} className="header__option">
            <span className="header__optionLineOne">Hello {user !== null ? user.name : "Guest"}!</span>
            <span className="header__optionLineTwo">{user !== null ? "Sign Out" : "Sign In"}</span>
          </div>
          <div onClick={() => history.push('/cart')} className="header__optionBasket">
            <ShoppingCartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {cart.length}
            </span>
          </div>
        </div>

      </div>
      <span id="header__mobile__search">
      <input
            className="header__searchInput"
            type="text"
            placeholder="Search"
            onKeyDown={keyPress}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        <SearchIcon className="header__searchIcon" onClick={(e) => handleSearch(e)} />
      </span>
    </>
  );
}

export default Header;