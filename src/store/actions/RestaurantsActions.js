import axios from "axios";

import {
  FETCHALLRESTAURANTS,
  ADDRESTAURANT,
  EDITRESTAURANT,
  TOGGLEACTIVERESTAURANT,
  DELETERESTAURANT,
} from "../actions/ActionTypes";

export const fetchAllRestaurants = () => (dispatch) => {
  axios
    .get("https://alofoodie-v2.herokuapp.com/getAllRestaurants")
    .then((res) =>
      dispatch({ type: FETCHALLRESTAURANTS, payLoad: res.data.allRestaurants })
    )
    .catch((err) => console.log(err));
};

export const addRestaurant = (restaurantInfo) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/addRestaurant", {
      restaurantInfo: restaurantInfo,
    })
    .then((res) => {
      dispatch({ type: ADDRESTAURANT, payLoad: res.data.newRestaurant });
    })
    .catch((err) => console.log(err));
};

export const editRestaurant = (restaurantInfo) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/updateRestaurant", {
      restaurantInfo: restaurantInfo,
    })
    .then((res) => {
      dispatch({ type: EDITRESTAURANT, payLoad: res.data.updatedRestaurant });
    })
    .catch((err) => console.log(err));
};

export const toggleActiveRestaurant = (resId) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/toggleActiveRestaurant", {
      resId: resId,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: TOGGLEACTIVERESTAURANT,
        payLoad: { resId: resId, isActive: res.data.udpdated },
      });
    })
    .catch((err) => console.log(err));
};

export const deleteRestaurant = () => (dispatch) => {
  axios
    .delete("https://alofoodie-v2.herokuapp.com/admin/deleteRestaurant")
    .then((res) => {
      console.log(res);
      dispatch({ type: DELETERESTAURANT });
    })
    .catch((err) => console.log(err));
};
