import axios from "axios";

import { restaurantTypes } from "./actionTypes";

const get = () => (dispatch) => {
  axios
    .get("https://alofoodie.herokuapp.com/restaurants")
    .then((res) =>
      dispatch({ type: restaurantTypes.get, payLoad: res.data.data })
    )
    .catch((err) => console.log(err));
};

const create = (config) => (dispatch) => {
  axios
    .post("http://localhost:5000/admin/restaurant", {
      config: config,
    })
    .then((res) => {
      dispatch({ type: restaurantTypes.create, payLoad: res.data.data });
    })
    .catch((err) => console.log(err));
};

const updateOne = (config) => (dispatch) => {
  axios
    .post("http://localhost:5000/admin/restaurant/update", {
      config: config,
    })
    .then((res) => {
      dispatch({ type: restaurantTypes.updateOne, payLoad: res.data.data });
    })
    .catch((err) => console.log(err));
};

const deleteOne = (id) => (dispatch) => {
  axios
    .delete("https://alofoodie.herokuapp.com/admin/restaurant", {
      params: { id: id },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: restaurantTypes.deleteOne });
    })
    .catch((err) => console.log(err));
};

const toggleAvailability = (id) => (dispatch) => {
  axios
    .post("https://alofoodie.herokuapp.com/admin/restaurant/toggle", {
      id: id,
    })
    .then((res) => {
      dispatch({
        type: restaurantTypes.toggle,
        payLoad: { id: id, active: res.data.data === `true` },
      });
    })
    .catch((err) => console.log(err));
};

export const restaurantActions = {
  get: get,
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
  toggleAvailability: toggleAvailability,
};
