import axios from "axios";

import { FETCHALLFOODS, ADDFOOD, EDITFOOD, DELETEFOOD } from "./ActionTypes";

export const fetchSetFoods = (resId) => (dispatch) => {
  axios
    .get("https://alofoodie-v2.herokuapp.com/getFoodItemsByResId", {
      params: {
        resId: resId,
      },
    })
    .then((res) =>
      dispatch({ type: FETCHALLFOODS, payLoad: res.data.allFoods })
    )
    .catch((err) => console.log(err));
};

export const addFood = (foodInfo) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/addNewFoodItem", {
      foodInfo: foodInfo,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: ADDFOOD, payLoad: res.data.newFood });
    })
    .catch((err) => console.log(err));
};

export const editFood = (foodInfo) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/updateFoodItem", {
      foodInfo: foodInfo,
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: EDITFOOD, payLoad: res.data.updatedFood });
    })
    .catch((err) => console.log(err));
};

export const deleteFood = (foodId) => (dispatch) => {
  axios
    .delete("https://alofoodie-v2.herokuapp.com/admin/deleteFoodItem", {
      params: { foodId: foodId },
    })
    .then((res) => dispatch({ type: DELETEFOOD, payLoad: foodId }))
    .catch((err) => console.log(err));
};
