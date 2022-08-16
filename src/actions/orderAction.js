import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
  ALL_ORDERS_DATE_REQUEST,
  ALL_ORDERS_DATE_SUCCESS,
  ALL_ORDERS_DATE_FAIL,
  ALL_ORDERS_STATUS_REQUEST,
  ALL_ORDERS_STATUS_SUCCESS,
  ALL_ORDERS_STATUS_FAIL,
} from "../constants/orderConstants";

import axios from "axios";
import { getCart } from "./cartAction";

// Tạo đơn hàng
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.post(
      "https://laptop-app-lhd.herokuapp.com/api/v1/order/new",
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    dispatch(getCart());
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Xem tất cả đơn hàng (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const { data } = await axios.get(
      "https://laptop-app-lhd.herokuapp.com/api/v1/admin/orders",
      config
    );

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Xem tất cả đơn hàng để thống kê (admin)
export const getAllOrdersStatistical =
  (dateStart, dateEnd) => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_DATE_REQUEST });

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };

      let link = `https://laptop-app-lhd.herokuapp.com/api/v1/admin/ordersStatistical`;

      if (dateStart && dateEnd) {
        link = `https://laptop-app-lhd.herokuapp.com/api/v1/admin/ordersStatistical?dateStart=${dateStart}&dateEnd=${dateEnd}`;
      }

      const { data } = await axios.get(link, config);

      dispatch({ type: ALL_ORDERS_DATE_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_DATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Xem tất cả đơn hàng theo status (admin)
export const getAllOrdersStatus = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_STATUS_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const { data } = await axios.get(
      "https://laptop-app-lhd.herokuapp.com/api/v1/admin/ordersStatus",
      config
    );

    dispatch({
      type: ALL_ORDERS_STATUS_SUCCESS,
      payload1: data.ordersProssesing,
      payload2: data.ordersShipped,
      payload3: data.ordersDelivered,
      payload4: data.ordersCancel,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Đơn hàng của tôi
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.get(
      "https://laptop-app-lhd.herokuapp.com/api/v1/orders/me",
      config
    );

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Cập nhật đơn hàng
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const { data } = await axios.put(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/order/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Xóa đơn hàng
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };
    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/order/${id}`,
      config
    );

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Xem chi tiết đơn hàng
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.get(
      `https://laptop-app-lhd.herokuapp.com/api/v1/order/${id}`,
      config
    );

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
