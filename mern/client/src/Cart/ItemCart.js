import React from "react";
import "./ItemCart.css";
import { connect } from "react-redux";
import { INCREASE, DECREASE, REMOVE } from "../redux/actions";
// M UI
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

function ItemCart({ title, price, img, amount, remove, increase, decrease }) {
  return (
    <div className="cartProduct">
      {/* Left section */}
      <div className="cartProduct__description">
        <img className="cartProduct__image" src={img} alt="" />

        <div className="cartProduct__info">
          <p className="cartProduct__title">{title}</p>

          <p className="cartProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>

          <button className="cartProduct__remove" onClick={() => remove()}>
            Remove from basket
          </button>
        </div>
      </div>
      {/* Right section */}
      <div className="cartProduct__arrows">
        <button className="cartProduct__arrow" onClick={() => increase()}>
          <ArrowUpwardIcon className="cartProduct__icon" />
        </button>
        <p className="cartProduct__amount">{amount}</p>
        <button
          className="cartProduct__arrow"
          onClick={() => {
            if (amount === 1) {
              return remove();
            } else {
              return decrease();
            }
          }}
        >
          <ArrowDownwardIcon className="cartProduct__icon" />
        </button>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id, amount } = ownProps;
  return {
    increase: () => dispatch({ type: INCREASE, payload: { id } }),
    decrease: () => dispatch({ type: DECREASE, payload: { id, amount } }),
    remove: () => dispatch({ type: REMOVE, payload: { id } }),
  };
}

export default connect(null, mapDispatchToProps)(ItemCart);
