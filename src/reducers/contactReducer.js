import { DELETE_CATEGORY_REQUEST } from "../constants/categoryConstants.js";
import {
  ALL_CONTACT_FAIL,
  ALL_CONTACT_REQUEST,
  ALL_CONTACT_SUCCESS,
  CLEAR_ERRORS,
  CONTACT_DETAILS_FAIL,
  CONTACT_DETAILS_REQUEST,
  CONTACT_DETAILS_SUCCESS,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_RESET,
  DELETE_CONTACT_SUCCESS,
  NEW_CONTACT_FAIL,
  NEW_CONTACT_REQUEST,
  NEW_CONTACT_RESET,
  NEW_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_REQUEST,
  UPDATE_CONTACT_RESET,
  UPDATE_CONTACT_SUCCESS,
} from "../constants/contactConstants.js";

export const contactsReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case ALL_CONTACT_REQUEST:
      return {
        loading: true,
        contacts: [],
      };

    case ALL_CONTACT_SUCCESS:
      return {
        loading: false,
        contacts: action.payload,
      };
    case ALL_CONTACT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newContactReducer = (state = { contact: {} }, action) => {
  switch (action.type) {
    case NEW_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case NEW_CONTACT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        contact: action.payload.contact,
      };
    case NEW_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CONTACT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const contactReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
    case UPDATE_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_CONTACT_FAIL:
    case UPDATE_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CONTACT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_CONTACT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const contactDetailsReducer = (state = { contact: {} }, action) => {
  switch (action.type) {
    case CONTACT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CONTACT_DETAILS_SUCCESS:
      return {
        loading: false,
        contact: action.payload,
      };
    case CONTACT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
