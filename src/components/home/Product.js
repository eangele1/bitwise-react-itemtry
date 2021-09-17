import React from "react";
import { useHistory } from "react-router-dom";
import "./Product.css";

function Product({ id = 0, title = "", image = "", price = 0.0, rating = {rating: 0.0, count: 0} }) {

  const history = useHistory();

  return (
    <div className="cardStyle">
      <br />
      <div className="container">
        <img src={image} alt="item" style={{ width: "50%", height: "50%" }} />
        <br />
        <br />
        <h3 onClick={() => history.push(`/products/details/${id}`)} style={{ padding: "0px 10px", cursor: "pointer" }}>{title}</h3>
        <br />
        {Array(Math.round(rating.rate))
            .fill()
            .map((_, i) => (
              <span key={i}>⭐</span>
            ))}
        <span>{` (${rating.count})`}</span>
        <br />
        <br />
        <p className="priceStyle">${price}</p>
      </div>
      <br />
    </div>
  );
}

export default Product;