import React from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Avatar } from "@material-ui/core";
import { connect } from "react-redux";

function Header({ amount }) {
  return (
    <div className="header">
      {/* Logo */}
      <div className="header__logo">
        <h2>myCoolLogo</h2>
      </div>
      {/*4 Nav links */}
      <div className="header__links">
        <NavLink exact to="/" className="header__link" activeClassName="activeL">
          <h2>Feed</h2>
        </NavLink>

        <NavLink exact to="/Stuff" className="header__link" activeClassName="activeL">
          <h2>Stuff</h2>
        </NavLink>

        <NavLink exact to="/Map" className="header__link" activeClassName="activeL">
          <h2>Map</h2>
        </NavLink>

        <NavLink exact to="/Store" className="header__link" activeClassName="activeL">
          <h2>Store</h2>
        </NavLink>
      </div>
      {/*basket */}
      <div className="header__cart">
        <NavLink exact to="Cart" className="shoppingcart" activeClassName="activeL">
          <p className="shopping__amount">{amount}</p>
          <ShoppingCartIcon className="shopping__icon" />
        </NavLink>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    amount: state.amount,
  };
};
export default connect(mapStateToProps)(Header);
