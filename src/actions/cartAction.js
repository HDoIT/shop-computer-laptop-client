import axios from "axios";
import axiosClient from "../api/axiosClient";

import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

// Get cart
export const getCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.get("/api/v1/cart", config);

    dispatch({
      type: GET_CART_SUCCESS,
      payload1: data.cart,
      payload2: data.cartItems,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add to cart
export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.post(
      "https://laptop-app-lhd.herokuapp.com/api/v1/cart",
      {
        productId,
        quantity,
      },
      config
    );

    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: data.success,
      payload1: data.cart,
      payload2: data.cartItems,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Remove item from cart
export const deleteFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/cart/${productId}`,
      config
    );

    dispatch({
      type: REMOVE_CART_ITEM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Add to Cart Local
export const addItemsToCartLocal =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(
      `https://laptop-app-lhd.herokuapp.com/api/v1/product/${id}`
    );

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartLocal.cartItems)
    );
  };

// REMOVE FROM CART LOCAL
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartLocal.cartItems)
  );
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
