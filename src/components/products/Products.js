import React, { useEffect, useState, useContext } from 'react';
import Header from "../header/Header.js";
import Spinner from "../Spinner/Spinner.js";
import Footer from "../footer/Footer.js";

import { getAllProducts, getProductsByCategory } from "../../utilities/utils.js";
import { useParams, useHistory } from 'react-router-dom';

import { CartContext } from '../../context/CartContext.js';

import "./Products.css";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { category, input } = useParams();
  const { dispatchCartEvent } = useContext(CartContext);
  const history = useHistory();
  
  const handleAddItem = (item) => {
    Object.assign(item, {quantity: 1});
    dispatchCartEvent('ADD', { item: item });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    if (category === "all" && !input) {
      getAllProducts()
        .then((result) => {
          setProducts(result);
          setLoading(false);
        });
    }
    else if (category === "all" && input) {
      getAllProducts()
        .then((result) => {

          var tempArr = [];

          for (var i in result) {
            if (result[i].title.toLowerCase().includes(input)) {
              tempArr.push(result[i]);
            }
          }

          setProducts(tempArr);
          setLoading(false);
        });
    }
    else if (category && !input) {
      getProductsByCategory(category)
        .then((result) => {
          setProducts(result);
          setLoading(false);
        });
    }
    else if (category && input) {
      getProductsByCategory(category)
        .then((result) => {

          var tempArr = [];

          for (var i in result) {
            if (result[i].title.toLowerCase().includes(input)) {
              tempArr.push(result[i]);
            }
          }

          setProducts(tempArr);
          setLoading(false);
        });
    }
    return;
  }, [category, input]);

  return (
    <>
      <Header />
      <div id="products">

        <div className="row">
          <div className="column1" style={{ fontFamily: "Helvetica" }}>
            <h2 style={{ paddingBottom: "50px" }}>Categories</h2>
            <p onClick={() => { if (!isLoading) { history.push(`/products/all/`) } }}>All</p> <br />
            <p onClick={() => { if (!isLoading) { history.push(`/products/electronics/`) } }}>Electronics</p> <br />
            <p onClick={() => { if (!isLoading) { history.push(`/products/jewelery/`) } }}>Jewelery</p> <br />
            <p onClick={() => { if (!isLoading) { history.push(`/products/men's clothing/`) } }}>Men's Clothing</p> <br />
            <p onClick={() => { if (!isLoading) { history.push(`/products/women's clothing/`) } }}>Women's Clothing</p> <br />
          </div>
          <div className="column2" style={{ fontFamily: "Helvetica" }}>

            {isLoading ? <><center><Spinner LoadState={isLoading} /></center></> : <>

              {products.length !== 0 ? products.map((item, index) => (
                <div key={index} style={{ padding: "20px 0", display: "flex" }}>
                  <img alt="_item" style={{ margin: "0", padding: "0px 30px", width: "100px", height: "100%" }} src={item.image} />
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
                    <button onClick={() => handleAddItem(item)} id="cart-button" type="button">Add Item</button>
                  </div>
                </div>
              )) : <h3 style={{ textAlign: "center" }}>No results found.</h3>}

            </>}

          </div>
        </div>

      </div>
      <Footer>©2021 Itemtry is owned and operated by Ezer Angeles under an MIT License.<br />The owner is not responsible on any aspects of your purchases since you cannot actually purchase anything here.</Footer>
    </>
  );
}

export default Products;