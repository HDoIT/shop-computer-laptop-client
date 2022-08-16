import {
  ADD_TO_WISHLIST,
  ADD_TO_WISHLIST_FAIL,
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_RESET,
  ADD_TO_WISHLIST_SUCCESS,
  CLEAR_ERRORS,
  GET_WISHLIST_FAIL,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM_FAIL,
  REMOVE_WISHLIST_ITEM_REQUEST,
  REMOVE_WISHLIST_ITEM_RESET,
  REMOVE_WISHLIST_ITEM_SUCCESS,
} from "../constants/wishlistConstants.js";

export const wishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload1,
        wishlistItems: action.payload2,
      };
    case GET_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REMOVE_WISHLIST_ITEM_REQUEST:
    case ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_WISHLIST_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        wishlist: action.payload1,
        wishlistItems: action.payload2,
      };
    case REMOVE_WISHLIST_ITEM_FAIL:
    case ADD_TO_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_WISHLIST_ITEM_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case ADD_TO_WISHLIST_RESET:
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

export const wishlistLocalReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExistIndex = state.cartItems.findIndex(
        (i) => i.product === item.product
      );

      if (isItemExistIndex > -1) {
        let wishlistItem = state.cartItems[isItemExistIndex];
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((i) =>
            i.product === wishlistItem.product ? wishlistItem : i
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
