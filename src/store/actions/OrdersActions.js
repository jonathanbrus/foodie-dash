import axios from "axios";

import { FETCHALLORDERS, EDITORDER } from "./ActionTypes";

export const FetchSetOrders = () => (dispatch) => {
  axios
    .get("https://alofoodie-v2.herokuapp.com/admin/allOrders")
    .then((res) =>
      dispatch({
        type: FETCHALLORDERS,
        payLoad: {
          orders: res.data.allOrders,
          totalOrders: res.data.totalOrders,
        },
      })
    )
    .catch((err) => console.log(err));
};

export const EditOrder =
  (orderId, isPaid, orderStatus, ifNeeded) => (dispatch) => {
    axios
      .post("https://alofoodie-v2.herokuapp.com/admin/updateOrder", {
        orderId: orderId,
        isPaid: isPaid,
        orderStatus: orderStatus,
        ifNeeded: ifNeeded,
      })
      .then((res) => {
        dispatch({ type: EDITORDER, payLoad: res.data.updatedOrder });
      })
      .catch((err) => console.log(err));
  };
