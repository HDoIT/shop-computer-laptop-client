import {
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_RESET,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_RESET,
  CLEAR_ERRORS,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants.js";

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload1,
        cartItems: action.payload2,
      };
    case GET_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REMOVE_CART_ITEM_REQUEST:
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
        cart: action.payload1,
        cartItems: action.payload2,
      };
    case REMOVE_CART_ITEM_FAIL:
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_CART_ITEM_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case ADD_TO_CART_RESET:
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

export const cartLocalReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExistIndex = state.cartItems.findIndex(
        (i) => i.product === item.product
      );

      if (isItemExistIndex > -1) {
        let cartItem = state.cartItems[isItemExistIndex];
        cartItem.quantity += action.payload.quantity;
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === cartItem.product ? cartItem : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
