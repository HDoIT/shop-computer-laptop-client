import axios from "axios";
import axiosClient from "../api/axiosClient";

import {
  ADD_TO_WISHLIST,
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM_FAIL,
  REMOVE_WISHLIST_ITEM_REQUEST,
  REMOVE_WISHLIST_ITEM_SUCCESS,
} from "../constants/wishlistConstants.js";

// Get wishlist
export const getWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_WISHLIST_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.get("/api/v1/wishlist", config);

    dispatch({
      type: GET_WISHLIST_SUCCESS,
      payload1: data.wishlist,
      payload2: data.wishlistItems,
    });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add to wishlist
export const addToWishlist = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_WISHLIST_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.post(
      "https://laptop-app-lhd.herokuapp.com/api/v1/wishlist",
      {
        productId,
      },
      config
    );

    dispatch({
      type: ADD_TO_WISHLIST_SUCCESS,
      payload: data.success,
      payload1: data.wishlist,
      payload2: data.wishlistItems,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_WISHLIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Remove item from wishlist
export const deleteFromWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_WISHLIST_ITEM_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/wishlist/${productId}`,
      config
    );

    dispatch({
      type: REMOVE_WISHLIST_ITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add to wishlist Local
export const addItemsToWishlistLocal = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://laptop-app-lhd.herokuapp.com/api/v1/product/${id}`
  );

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
    },
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlistLocal.wishlistItems)
  );
};

// REMOVE FROM wishlist LOCAL
export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_WISHLIST_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(getState().wishlistLocal.wishlistItems)
  );
};
