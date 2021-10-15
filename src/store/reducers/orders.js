import { orderTypes } from "../actions/actionTypes";

const initialState = {
  orders: [],
};

export const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderTypes.get:
      return {
        ...state,
        orders: action.payLoad,
      };

    case orderTypes.updateOne:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order._id === action.payLoad._id) {
            order.orderStatus = action.payLoad.orderStatus;
            order.paid = action.payLoad.paid;
          }
          return order;
        }),
      };

    default:
      return state;
  }
};
