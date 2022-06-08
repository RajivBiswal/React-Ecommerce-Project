import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productCreateReviewReducer,
  productFeatureReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { orderCreateReducer,
         orderDetailsReducer, 
         orderListReducer, 
         orderMyOrdersReducer, 
         orderPayReducer,
         orderPackedReducer,
         orderShippedReducer,
         orderDeliveredReducer,
          } from "./reducers/orderReducers";

const reducer = combineReducers({
  cart: cartReducer,
  
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productFeature: productFeatureReducer,

  userList: userListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMyOrders: orderMyOrdersReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderPacked: orderPackedReducer,
  orderShipped: orderShippedReducer,
  orderDelivered: orderDeliveredReducer,
});

// setting cartitemsdata from action into local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")) : [];
  

// setting userinfo from action into local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")) : null;
  

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
  

// initialize the state of cartitems & shippingaddress with localstorage data.
// So it will load from local storage at the begining of the page load
const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
   },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
