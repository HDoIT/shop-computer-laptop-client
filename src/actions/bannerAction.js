import axios from "axios";
import axiosClient from "../api/axiosClient";

import {
  ALL_BANNER_FAIL,
  ALL_BANNER_REQUEST,
  ALL_BANNER_SUCCESS,
  BANNER_DETAILS_FAIL,
  BANNER_DETAILS_REQUEST,
  BANNER_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BANNER_FAIL,
  DELETE_BANNER_REQUEST,
  DELETE_BANNER_SUCCESS,
  NEW_BANNER_FAIL,
  NEW_BANNER_REQUEST,
  NEW_BANNER_SUCCESS,
  UPDATE_BANNER_FAIL,
  UPDATE_BANNER_REQUEST,
  UPDATE_BANNER_SUCCESS,
} from "../constants/bannerConstants.js";

// Get All Banners
export const getAllBanners = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BANNER_REQUEST });

    const data = await axiosClient.get("/api/v1/banners");

    dispatch({
      type: ALL_BANNER_SUCCESS,
      payload: data.banners,
    });
  } catch (error) {
    dispatch({
      type: ALL_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Banner
export const createBanner = (bannerData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BANNER_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.post(
      `/api/v1/admin/banner/new`,
      bannerData,
      config
    );

    dispatch({
      type: NEW_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Banner
export const updateBanner = (id, bannerData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.put(
      `/api/v1/admin/banner/${id}`,
      bannerData,
      config
    );

    dispatch({
      type: UPDATE_BANNER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Banner
export const deleteBanner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.delete(`/api/v1/admin/banner/${id}`, config);

    dispatch({
      type: DELETE_BANNER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Banner Details
export const getBannerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BANNER_DETAILS_REQUEST });

    const data = await axiosClient.get(`/api/v1/banner/${id}`);

    dispatch({
      type: BANNER_DETAILS_SUCCESS,
      payload: data.banner,
    });
  } catch (error) {
    dispatch({
      type: BANNER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
