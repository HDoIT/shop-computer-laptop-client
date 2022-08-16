import axios from "axios";
import axiosClient from "../api/axiosClient";

import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ALL_REVIEW_BLOG_FAIL,
  ALL_REVIEW_BLOG_REQUEST,
  ALL_REVIEW_BLOG_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_REVIEW_BLOG_FAIL,
  DELETE_REVIEW_BLOG_REQUEST,
  DELETE_REVIEW_BLOG_SUCCESS,
  NEW_BLOG_FAIL,
  NEW_BLOG_REQUEST,
  NEW_BLOG_SUCCESS,
  NEW_REVIEW_BLOG_FAIL,
  NEW_REVIEW_BLOG_REQUEST,
  NEW_REVIEW_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
} from "../constants/blogConstants.js";

// Get All Blogs
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOG_REQUEST });

    const { data } = await axios.get(
      "https://laptop-app-lhd.herokuapp.com/api/v1/admin/blogs"
    );

    dispatch({
      type: ALL_BLOG_SUCCESS,
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: ALL_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Blogs
// export const getAllAdminBlogs = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_BLOG_REQUEST });

//     const { data } = await axios.get(
//       "https://laptop-app-lhd.herokuapp.com/api/v1/admin/blogs"
//     );

//     dispatch({
//       type: ALL_BLOG_SUCCESS,
//       payload: data.blogs,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_BLOG_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Create Blog
export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BLOG_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.post(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/blog/new`,
      blogData,
      config
    );

    dispatch({
      type: NEW_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Blog
export const updateBlog = (id, blogData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOG_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.put(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/blog/${id}`,
      blogData,
      config
    );

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/admin/blog/${id}`,
      config
    );

    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Blog Details
export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const data = await axiosClient.get(
      `https://laptop-app-lhd.herokuapp.com/api/v1/blog/${id}`
    );

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW blog
export const newReviewBlog = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_BLOG_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.put(
      `https://laptop-app-lhd.herokuapp.com/api/v1/blogReview`,
      {
        comment: reviewData.comment,
        blogId: reviewData.blogId,
      },
      config
    );

    dispatch({
      type: NEW_REVIEW_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Blog
export const getAllReviewsBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_BLOG_REQUEST });

    const data = await axiosClient.get(`/api/v1/blogReviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_BLOG_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Blog
export const deleteReviewsBlog = (reviewId, blogId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_BLOG_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    };

    const { data } = await axios.delete(
      `https://laptop-app-lhd.herokuapp.com/api/v1/blogReviews?id=${reviewId}&blogId=${blogId}`,
      config
    );

    dispatch({
      type: DELETE_REVIEW_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
