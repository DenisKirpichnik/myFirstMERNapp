import React, { useEffect } from "react";
import ItemCart from "./ItemCart";
import { connect } from "react-redux";
import "./Cart.css";
import { CLEAR_CART, GET_TOTALS } from "../redux/actions";

function Cart({ cart = [], total, dispatch }) {
  useEffect(() => {
    dispatch({ type: GET_TOTALS });
  }, [cart, dispatch]);

  if (cart.length === 0) {
    return (
      <div className="cart__empty">
        <h2 className="cart__emptyText">Your cart is currently empty</h2>
        <img src="https://memegenerator.net/img/instances/80861748.jpg" alt="" />
      </div>
    );
  }
  return (
    <div className="cart">
      <div class="cart__items">
        {cart.map((item) => {
          return <ItemCart key={item.id} {...item} />;
        })}
        <hr />
      </div>
      <div class="cart__sidebar">
        <h4>
          Total <span>${total}</span>
        </h4>
        <button className="cart__clearAllBtn" onClick={() => dispatch({ type: CLEAR_CART })}>
          ClEAR CART
        </button>
      </div>
    </div>
  );
}
function mapStateToProps(store) {
  // desctructuring - const {cart, total} = store
  const { cart, total } = store;
  return { cart, total };
}
export default connect(mapStateToProps)(Cart);
