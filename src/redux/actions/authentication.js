import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./actionTypes";
import { fetchChannels } from "./channel";

import { setErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      console.log(user);
      history.push("/private");
    } catch (err) {
      console.error(err);
      console.error(err.response.data);
      dispatch(setErrors("Invalid"));
    }
  };
};

export const signup = (userData, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      dispatch(setCurrentUser(user.token));
      history.push("/");
    } catch (err) {
      console.error(err);
      console.error(err.response.data);
    }
  };
};

export const logout = () => setCurrentUser();

const setCurrentUser = token => {
  return async dispatch => {
    try {
      let user;
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common.Authorization = `jwt ${token}`;
        user = jwt_decode(token);
        dispatch(fetchChannels());
      } else {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common.Authorization;
        user = null;
      }
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const checkForExpiredToken = () => {
  return dispatch => {
    // Check for token expiration
    const token = localStorage.getItem("token");

    if (token) {
      const currentTimeInSeconds = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTimeInSeconds) {
        // Set user
        dispatch(setCurrentUser(token));
      } else {
        dispatch(logout());
      }
    }
  };
};
