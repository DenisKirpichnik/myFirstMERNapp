import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import WorldMap from "./WorldMap/WorldMap";
import Stuff from "./Stuff/Stuff";
import Feed from "./Feed/Feed";
import Store from "./Store/Store";
import Cart from "./Cart/Cart";
import { getPosts } from "./redux/posts";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/Cart">
              <Cart cart={store.getState()} />
            </Route>

            <Route path="/Stuff">
              <Stuff />
            </Route>

            <Route path="/Map">
              <WorldMap />
            </Route>

            <Route path="/Store">
              <Store store={store.getState()} />
            </Route>

            <Route path="/">
              <Feed />
            </Route>
          </Switch>

          <Footer />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
