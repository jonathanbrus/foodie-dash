import axios from "axios";

import { productTypes } from "./actionTypes";

const get = (category) => (dispatch) =>
  axios
    .get("https://alofoodie.herokuapp.com/products", {
      params: {
        category: category,
      },
    })
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(res.data.message);
      }

      dispatch({ type: productTypes.get, payLoad: res.data.data });
    });

const create = (category, config) => (dispatch) =>
  axios
    .post("https://alofoodie.herokuapp.com/admin/product", {
      category: category,
      config: config,
    })
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(res.data.message);
      }

      dispatch({ type: productTypes.create, payLoad: res.data.data });
    });

const updateOne = (category, config) => (dispatch) =>
  axios
    .post("https://alofoodie.herokuapp.com/admin/product/update", {
      category: category,
      config: config,
    })
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(res.data.message);
      }

      dispatch({ type: productTypes.updateOne, payLoad: res.data.data });
    });

const deleteOne = (id) => (dispatch) =>
  axios
    .delete("https://alofoodie.herokuapp.com/admin/product", {
      params: { id: id },
    })
    .then((res) => {
      if (res.data.status !== 200) {
        console.log(res.data.message);
      }

      dispatch({ type: productTypes.deleteOne, payLoad: id });
    });

export const prodcutActions = {
  get: get,
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
};
