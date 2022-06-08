import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    
  switch (action.type) {
    
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //find item in cart if exist or not
      if (existItem) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        }; // if it exist then we return the previous state and map the cart item
        //whenever there's a match we'll update the item & if it doen't we'll replace the item
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }; // if not exist we return the previous state, previous cartItems along with new item
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
      }

    default:
      return state;
  }
};
