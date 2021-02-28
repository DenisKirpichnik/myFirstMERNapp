import { FETCH_ALL, CREATE, UPDATE, SETCURRENTID, DELETE, LIKE, UPDATECOMMENTS } from "./actions";
import * as api from "../api/index.js";

// Action creators for the win
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data }); // have to dispatch an action with redux thunk)
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post); // response.data

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentId = (id) => async (dispatch) => {
  dispatch({ type: SETCURRENTID, payload: id });
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id); // response.data

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateComments = (id, comment) => async (dispatch) => {
  try {
    // calling update comments api
    const data = await api.updateComments(id, comment);
    console.log("data...", data);
  } catch (error) {
    console.log(error);
  }
};
