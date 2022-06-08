import axios from 'axios';

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_MYORDERS_REQUEST,
    ORDER_MYORDERS_SUCCESS,
    ORDER_MYORDERS_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_PACKED_REQUEST,
    ORDER_PACKED_SUCCESS,
    ORDER_PACKED_FAIL,

    ORDER_SHIPPED_REQUEST,
    ORDER_SHIPPED_SUCCESS,
    ORDER_SHIPPED_FAIL,

    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DELIVERED_FAIL,
} from '../constants/orderCostants';

import {CART_CLEAR_ITEMS} from '../constants/cartConstants';


/////////////////////Action for create an Order//////////////////////////
////////////////////////////////////////////////////////////////////////
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
          );

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        });

        localStorage.removeItem('cartItems')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

////////////////////////Action for getting order details/////////////////////
////////////////////////////////////////////////////////////////////////////
export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
          );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

////////////////////////Action for pay order amount////////////////////////
//////////////////////////////////////////////////////////////////////////
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
          );

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//////////////////////Action for listing order items//////////////////////
/////////////////////////////////////////////////////////////////////////
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MYORDERS_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/orders/myorders/`,
            config
          );

        dispatch({
            type: ORDER_MYORDERS_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_MYORDERS_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
/////////////////////Action for all OrderList///////////////////////////
///////////////////////////////////////////////////////////////////
export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/orders/`,
            config
          );

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

////////////////////////Action for packed order///////////////////////////
//////////////////////////////////////////////////////////////////////////
export const packedOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PACKED_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${order._id}/packed/`,
            {},
            config
          );

        dispatch({
            type: ORDER_PACKED_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_PACKED_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

////////////////////////Action for shipped order///////////////////////////
//////////////////////////////////////////////////////////////////////////
export const shippedOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_SHIPPED_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${order._id}/shipped/`,
            {},
            config
          );

        dispatch({
            type: ORDER_SHIPPED_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_SHIPPED_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

////////////////////////Action for delivered order///////////////////////////
//////////////////////////////////////////////////////////////////////////
export const deliveredOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVERED_REQUEST
        }) 

        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/orders/${order._id}/delivered/`,
            {},
            config
          );

        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: 
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}