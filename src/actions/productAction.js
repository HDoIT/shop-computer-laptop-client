import axios from "axios";
import axiosClient from "../api/axiosClient";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  N_PRODUCT_REQUEST,
  N_PRODUCT_SUCCESS,
  N_PRODUCT_FAIL,
  TOP_PRODUCT_REQUEST,
  TOP_PRODUCT_SUCCESS,
  TOP_PRODUCT_FAIL,
  ALL_PRODUCT_REVIEW_REQUEST,
  ALL_PRODUCT_REVIEW_SUCCESS,
  ALL_PRODUCT_REVIEW_FAIL,
} from "../constants/productConstants";

// Get All Products
export const getProduct =
  (
    currentPage = 1,
    category,
    price = [0, 151],
    // ratings = 0,
    sort,
    keyword = "",
    RAM,
    CPU,
    machineSeries,
    monitorSize = [11, 100]
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&${sort}`;

      // if (category) {
      //   link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&${sort}`;
      // }

      let priceSort0 = price[0] * 1000000;
      let priceSort1 = price[1] * 1000000;

      let link = `https://laptop-app-lhd.herokuapp.com/api/v1/products?keyword=${keyword}&price[gte]=${priceSort0}&price[lte]=${priceSort1}&page=${currentPage}&${sort}&monitorSize[gte]=${monitorSize[0]}&monitorSize[lte]=${monitorSize[1]}`;

      if (category) {
        link = `https://laptop-app-lhd.herokuapp.com/api/v1/products?keyword=${keyword}&price[gte]=${priceSort0}&price[lte]=${priceSort1}&page=${currentPage}&category=${category}&${sort}&monitorSize[gte]=${monitorSize[0]}&monitorSize[lte]=${monitorSize[1]}`;
      }

      if (RAM) {
        link = `https://laptop-app-lhd.herokuapp.com/api/v1/products?keyword=${keyword}&price[gte]=${priceSort0}&price[lte]=${priceSort1}&page=${currentPage}&RAM=${RAM}&${sort}&monitorSize[gte]=${monitorSize[0]}&monitorSize[lte]=${monitorSize[1]}`;
      }

      if (CPU) {
        link = `https://laptop-app-lhd.herokuapp.com/api/v1/products?keyword=${keyword}&price[gte]=${priceSort0}&price[lte]=${priceSort1}&page=${currentPage}&CPU=${CPU}&${sort}&monitorSize[gte]=${monitorSize[0]}&monitorSize[lte]=${monitorSize[1]}`;
      }

      if (machineSeries) {
        link = `https://laptop-app-lhd.herokuapp.com/api/v1/products?keyword=${keyword}&price[gte]=${priceSort0}&price[lte]=${priceSort1}&page=${currentPage}&machineSeries=${machineSeries}&${sort}&monitorSize[gte]=${monitorSize[0]}&monitorSize[lte]=${monitorSize[1]}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const data = await axiosClient.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Top Products For Admin
export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.get("/api/v1/admin/topProducts", config);

    dispatch({
      type: TOP_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCT_FAIL,
      payload: error.response.data.message,
    }); 
  }
};

// Get N Products
export const getNProducts = (numOfProducts) => async (dispatch) => {
  try {
    dispatch({ type: N_PRODUCT_REQUEST });

    const { data } = await axios.get("https://laptop-app-lhd.herokuapp.com/api/v1/nProducts");

    dispatch({
      type: N_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: N_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.post(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.put(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/product/${id}`,
      config
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const data = await axiosClient.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.put(
      `https://laptop-app-lhd.herokuapp.com/api/v1/review`,
      {
        rating: reviewData.rating,
        comment: reviewData.comment,
        productId: reviewData.productId,
      },
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const data = await axiosClient.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products Reviews
export const getAllProductReviews = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REVIEW_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.get(
      `https://laptop-app-lhd.herokuapp.com/api/v1/allReviews`,
      config
    );

    dispatch({
      type: ALL_PRODUCT_REVIEW_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/reviews?id=${reviewId}&productId=${productId}`,
      config
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
