import axios from "axios";

import { foodTypes } from "./actionTypes";

const get = (id) => (dispatch) => {
  axios
    .get("https://alofoodie.herokuapp.com/foods", {
      params: {
        id: id,
      },
    })
    .then((res) => dispatch({ type: foodTypes.get, payLoad: res.data.data }))
    .catch((err) => console.log(err));
};

const create = (config) => (dispatch) => {
  axios
    .post("https://alofoodie.herokuapp.com/admin/food", {
      config: config,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: foodTypes.create, payLoad: res.data.data });
    })
    .catch((err) => console.log(err));
};

const updateOne = (config) => (dispatch) => {
  axios
    .post("https://alofoodie.herokuapp.com/admin/food/update", {
      config: config,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: foodTypes.updateOne, payLoad: res.data.data });
    })
    .catch((err) => console.log(err));
};

const deleteOne = (id) => (dispatch) => {
  axios
    .delete("https://alofoodie.herokuapp.com/admin/food", {
      params: { id: id },
    })
    .then(() => dispatch({ type: foodTypes.deleteOne, payLoad: id }))
    .catch((err) => console.log(err));
};

const toggleAvailability = (id) => (dispatch) => {
  axios
    .post("https://alofoodie.herokuapp.com/admin/food/toggle", {
      id: id,
    })
    .then((res) => {
      dispatch({
        type: foodTypes.toggle,
        payLoad: { id: id, active: res.data.data === `true` },
      });
    })
    .catch((err) => console.log(err));
};

export const foodActions = {
  get: get,
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
  toggleAvailability: toggleAvailability,
};
