import {
  ADD_CHANNEL,
  FETCH_CHANNEL,
  FETCH_MSGS,
  ADD_MSG,
  FETCH_CHANNEL_DETAIL,
  FILTER_CHANNELS
} from "./actionTypes";
import axios from "axios";
// import jwt_decode from "jwt-decode";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const filterChannels = query => {
  return {
    type: FILTER_CHANNELS,
    payload: query
  };
};

export const addChannel = (channel, history) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api-chatr.herokuapp.com/channels/create/",
        channel
      );
      const object = res.data;
      console.log("hii", object);
      dispatch({
        type: ADD_CHANNEL,
        payload: object
      });
      history.push("/");
    } catch (err) {
      console.error(err);
      console.error(err.response.data);
    }
  };
};

export const fetchChannels = () => {
  return async dispatch => {
    try {
      const res = await axios.get("https://api-chatr.herokuapp.com/channels/");
      const channels = res.data;
      console.log("hiiiii", channels);
      dispatch({ type: FETCH_CHANNEL, payload: channels });
    } catch (err) {
      console.error(err);
      //console.error(err.response.data);
    }
  };
};

export const fetchChannelDetail = channelID => {
  return async dispatch => {
    try {
      const res = await instance.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/`
      );
      const channel = res.data;
      dispatch({
        type: FETCH_CHANNEL_DETAIL,
        payload: channel
      });
    } catch (err) {
      console.error(err);
    }
  };
};

//Same function defined twice with different name

export const fetchMsgs = channelID => {
  return async dispatch => {
    try {
      const res = await axios.get(
        `https://api-chatr.herokuapp.com/channels/${channelID}/`
      );
      const msgs = res.data;
      console.log("msgs!!!!!!!!!!!", msgs);
      dispatch({ type: FETCH_MSGS, payload: msgs });
    } catch (err) {
      console.error(err);
      console.error(err.response.data);
    }
  };
};

export const addMsg = (msg, channelID) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        `https://api-chatr.herokuapp.com/channels/${channelID}/send/`,
        msg
      );
      const object = res.data;
      console.log("My Message!!!!!!!!!!!!!!!!!!!!", object);
      dispatch({
        type: ADD_MSG,
        payload: msg
      });
      //history.push("/");
    } catch (err) {
      console.error(err);
      console.error(err.response.data);
    }
  };
};
