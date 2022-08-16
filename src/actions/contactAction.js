import axios from "axios";
import axiosClient from "../api/axiosClient";

import {
  ALL_CONTACT_FAIL,
  ALL_CONTACT_REQUEST,
  ALL_CONTACT_SUCCESS,
  CLEAR_ERRORS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_REQUEST,
  DELETE_CONTACT_SUCCESS,
  NEW_CONTACT_FAIL,
  NEW_CONTACT_REQUEST,
  NEW_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_SUCCESS,
} from "../constants/contactConstants.js";

// Get All Contacts
export const getAllContacts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CONTACT_REQUEST });

    const data = await axiosClient.get("/api/v1/contacts");

    dispatch({
      type: ALL_CONTACT_SUCCESS,
      payload: data.contacts,
    });
  } catch (error) {
    dispatch({
      type: ALL_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Contact
export const createContact = (contactData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CONTACT_REQUEST });

    // const token = localStorage.getItem("token");

    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };

    const { data } = await axios.post(
      `https://laptop-app-lhd.herokuapp.com/api/v1/contact/new`,
      contactData
      // config
    );

    dispatch({
      type: NEW_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Contact
export const updateContact = (id, contactData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CONTACT_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.put(
      `/api/v1/admin/contact/${id}`,
      contactData,
      config
    );

    dispatch({
      type: UPDATE_CONTACT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Contact
export const deleteContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const data = await axiosClient.delete(
      `/api/v1/admin/contact/${id}`,
      config
    );

    dispatch({
      type: DELETE_CONTACT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CONTACT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Contact Details
export const getContactDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_DETAILS_REQUEST });

    const data = await axiosClient.get(`/api/v1/contact/${id}`);

    dispatch({
      type: CONTACT_DETAILS_SUCCESS,
      payload: data.contact,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
