import React, { useState, useEffect, useContext } from 'react';
import Header from "../header/Header.js";
import Footer from "../footer/Footer.js";
import "./ProductDetails.css";
import { getProduct, getProductsByCategory } from '../../utilities/utils.js';
import Spinner from "../Spinner/Spinner.js";
import { CartContext } from '../../context/CartContext.js';

import { useParams, Redirect, useHistory } from 'react-router-dom';

const ProductDetails = () => {

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  const { id } = useParams();
  const history = useHistory();
  const { dispatchCartEvent } = useContext(CartContext);

  const handleAddItem = (item) => {
    Object.assign(item, {quantity: quantity});
    dispatchCartEvent('ADD', { item: item });
  }

  const randomUnique = (arrSize, count) => {
    var arr = [];
    while (arr.length < count) {
      var r = Math.floor(Math.random() * arrSize - 1) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  const loadData = (newID) => {
    window.scrollTo(0, 0);
    setLoading(true);
    getProduct(newID ? newID : id)
      .then((result) => {

        if (!result) {
          return <Redirect to="/" />
        }

        setProduct(result);

        getProductsByCategory(result.category)
          .then((result) => {

            var tempArr = [];
            var randNums = randomUnique(result.length, 4);

            for (var i in randNums) {
              tempArr.push(result[randNums[i]]);
            }

            setRelatedProducts(tempArr);
            setLoading(false);
          });

      });
  }

  useEffect(() => {
    loadData();
    return;
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <div id="product-details">
        {isLoading ? <><center><Spinner LoadState={isLoading} /></center></> : <>
          <div id="container">
            <div id="left-column">
              <img src={product.image} alt="_item" />
            </div>
            <div id="right-column">
              <div className="product-description">
                <span>{product.category}</span>
                <h1>{product.title}</h1>

                {Array(Math.round(product.rating.rate))
                  .fill()
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                <span>{` (${product.rating.count})`}</span>

                <p>{product.description}</p>
              </div>
              <div className="product-price">
                <div style={{ margin: "10px 0", fontSize: "32px", fontFamily: "Helvetica" }}>${product.price}</div>
                <div className="counter">
                  <span onClick={() => { quantity > 1 ? setQuantity(quantity - 1) : console.log("Go up dummy.") }}>-</span>
                  <input type="text" readOnly={true} value={String(quantity)} />
                  <span onClick={() => { quantity >= 1 ? setQuantity(quantity + 1) : console.log("You can't s-see me, c-can you?...") }}>+</span>
                </div>
                <div onClick={() => handleAddItem(product)} className="cart-btn">Add Item</div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div id="related-products">

            <div className="heading">Related Products</div>

            <div className="related-product-container">
              {relatedProducts.map((item, index) => (
                <div onClick={() => {history.push(`/products/details/${item.id}`); loadData(item.id);}} key={index} className="related-product-img">
                  <img alt="_item" src={item.image} />
                </div>
              ))}
            </div>

          </div>

        </>}
      </div>
      <Footer>©2021 Itemtry is owned and operated by Ezer Angeles under an MIT License.<br />The owner is not responsible on any aspects of your purchases since you cannot actually purchase anything here.</Footer>
    </>
  );
}

export default ProductDetails;