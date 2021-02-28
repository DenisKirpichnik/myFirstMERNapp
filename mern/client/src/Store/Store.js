import React from "react";
import "./Store.css";
import { connect } from "react-redux";
import StoreProduct from "./StoreProduct";
import StoreBanner from "../images/bannerstore.jpg";

//import storeProducts from "./storeProducts";

function Store({ store }) {
  return (
    <div className="store__wrapper">
      <div className="store">
        <img className="store__banner" src={StoreBanner} alt="" />

        <div className="store__products">
          <div class="store__row">
            {store.slice(0, 3).map((product) => {
              return <StoreProduct key={product.id} {...product} />;
            })}
          </div>
          <div class="store__row">
            {store.slice(3, 6).map((product) => {
              return <StoreProduct key={product.id} {...product} />;
            })}
          </div>
          <div class="store__row">
            {store.slice(6, 9).map((product) => {
              return <StoreProduct key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { store } = state;
  return { store: state.store };
}

export default connect(mapStateToProps)(Store);
