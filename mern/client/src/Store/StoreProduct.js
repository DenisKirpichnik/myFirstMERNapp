import React, { useState, useEffect } from "react";
import "./StoreProduct.css";
import { connect } from "react-redux";
import { ADD_TOCART } from "../redux/actions";
import { NavLink, Link } from "react-router-dom";

function StoreProduct({ title, img, amount, price, addtocart, show }) {
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={img} alt="" />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>

        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="arrows">
        {show == 1 ? (
          <button
            className="checkoutProduct__addBtn"
            onClick={() => {
              addtocart();
            }}
          >
            Add to cart
          </button>
        ) : (
          <NavLink exact to="Cart">
            <button className="inTheCart__button">In the cart</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps;
  return {
    addtocart: () => dispatch({ type: ADD_TOCART, payload: { id } }),
  };
}

export default connect(null, mapDispatchToProps)(StoreProduct);
