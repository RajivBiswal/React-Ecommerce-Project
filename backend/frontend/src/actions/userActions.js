import axios from "axios";
import { ORDER_MYORDERS_RESET } from "../constants/orderCostants";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,

  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

///////////Login Action////////////
//////////////////////////////////
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

///////////Logout Action///////////////
//////////////////////////////////////
export const logout = () => (dispatch) => {
  //remove userInfo from local storage when logout
  //and dispatch it with value of USER_LOGOUT
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({type: USER_DETAILS_RESET})
  dispatch({type: ORDER_MYORDERS_RESET})
  dispatch({type: USER_LIST_RESET})
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register/",
      { name: name, email: email, password: password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/////////////////User Profile Action//////////////////
/////////////////////////////////////////////////////
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    //pulled out the user via getState
    const {
      userLogin: { userInfo },
    } = getState();

    //Added token into config means without the token we can't access user profile
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make a get request send the info to getUserProfile view in backend
    //which'll return back a user
    const { data } = await axios.get(`/api/users/${id}/`, config);

    //after getting the user we dispatch the data as a payload & update our state
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

///////////////////////Update User Profile Action//////////////////////
//////////////////////////////////////////////////////////////
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    //pulled out the user via getState
    const {
      userLogin: { userInfo },
    } = getState();

    //Added token into config
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make a get request send the info to getUserProfile view in backend
    //which'll return back a user
    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config
    );

    //after getting the user we dispatch the data as a payload & update our state
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//////////////////////////////User List/////////////////////////////
///////////////////////////////////////////////////////////////////
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Added token into config
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make a get request send the info to getUserProfile view in backend
    //which'll return back a user
    const { data } = await axios.get(
      `/api/users/`,
      config
    );

    //after getting the user we dispatch the data as a payload & update our state
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });

     } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

/////////////////////////Delete User Action//////////////////////////
////////////////////////////////////////////////////////////////////
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Added token into config
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make a get request send the info to getUserProfile view in backend
    //which'll return back a user
    const { data } = await axios.delete(
      `/api/users/delete/${id}/`,
      config
    );

    //after getting the user we dispatch the data as a payload & update our state
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });

     } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

///////////////////////Update User Action///////////////////
///////////////////////////////////////////////////////////
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Added token into config
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    //make a get request send the info to getUserProfile view in backend
    //which'll return back a user
    const { data } = await axios.put(
      `/api/users/update/${user._id}/`,
      user,
      config
    );

    //after getting the user we dispatch the data as a payload & update our state
    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

     } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};