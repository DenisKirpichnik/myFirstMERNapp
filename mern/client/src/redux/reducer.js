import { combineReducers } from "redux";

import {
  DECREASE,
  INCREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTALS,
  ADD_TOCART,
  FETCH_ALL,
  CREATE,
  UPDATE,
  SETCURRENTID,
  DELETE,
  LIKE,
  UPDATECOMMENTS,
} from "./actions";

import storeProducts from "../Store/storeProducts";

const initialStore = {
  store: storeProducts, // array with products
  cart: [], // empty array
  total: 0,
  amount: 0,
  posts: [],
  currentId: null,
};

//reducer
function reducer(state = initialStore, action) {
  switch (action.type) {
    case UPDATECOMMENTS: //  change it
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? post.comments.concat(action.payload) : post
        ),
      };
      break;
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        currentId: null,
      };
      break;
    case SETCURRENTID:
      return {
        ...state,
        currentId: action.payload,
      };
      break;

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
        currentId: null,
      };
      break;
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };

      break;
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
      break;
    case FETCH_ALL:
      return { ...state, posts: action.payload };
      break;
    case INCREASE:
      tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };
      break;
    case DECREASE:
      var tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });

      return { ...state, cart: tempCart };
      break;
    case CLEAR_CART:
      state.store.map((a) => (a.show = 1));

      return { ...state, cart: [], store: state.store };

      break;
    case REMOVE:
      state.store.forEach((item) => {
        if (item.id === action.payload.id) {
          return (item.show = 1);
        }
      });
      return {
        ...state,
        cart: state.cart.filter((cartitem) => cartitem.id !== action.payload.id),
        store: state.store,
      };
      break;
    case GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };

      break;

    case ADD_TOCART:
      const p_id = action.payload.id;
      if (state.cart.filter((item) => item.id == p_id)) {
        let targetItem = state.store.filter((item) => item.id == p_id);
        targetItem[0].show = 0;

        return {
          ...state,
          amount: state.amount + 1,
          cart: [...state.cart].concat(targetItem),
          store: targetItem
            .concat(state.store.filter((item) => item.id != p_id))
            .sort((a, b) => a.id - b.id),
        };
      }
      break;

    default:
      return state;
  }

  return state;
}

export default reducer;
