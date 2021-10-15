import axios from "axios";

import { orderTypes } from "./actionTypes";

const get = () => (dispatch) => {
  axios
    .get("https://alofoodie.herokuapp.com/admin/orders", {
      params: { count: 60 },
    })
    .then((res) =>
      dispatch({
        type: orderTypes.get,
        payLoad: res.data.data,
      })
    )
    .catch((err) => console.log(err));
};

const update = (id, paid, orderStatus, other) => (dispatch) => {
  axios
    .post("https://alofoodie.herokuapp.com/admin/orders/update", {
      id: id,
      paid: paid,
      orderStatus: orderStatus,
      other: other,
    })
    .then((res) => {
      dispatch({ type: orderTypes.updateOne, payLoad: res.data.data });
    })
    .catch((err) => console.log(err));
};

export const orderActions = {
  get: get,
  update: update,
};
