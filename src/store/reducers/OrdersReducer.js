import { FETCHALLORDERS, EDITORDER } from "../actions/ActionTypes";

const initialState = {
  AllOrders: [],
  FoodOrders: [],
  OtherOrders: [],
  TotalOrders: 0,
};

export const OrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHALLORDERS:
      return {
        ...state,
        AllOrders: action.payLoad.orders,
        FoodOrders: action.payLoad.orders.filter(
          (order) => order.isFood === true
        ),
        OtherOrders: action.payLoad.orders.filter(
          (order) => order.isFood === false
        ),
        TotalOrders: action.payLoad.totalOrders,
      };

    case EDITORDER:
      return {
        ...state,
        AllOrders: state.AllOrders.map((order) => {
          if (order._id === action.payLoad._id) {
            order.orderStatus = action.payLoad.orderStatus;
            order.isPaid = action.payLoad.isPaid;
          }
          return order;
        }),
        FoodOrders: state.FoodOrders.map((order) => {
          if (order._id === action.payLoad._id) {
            order.orderStatus = action.payLoad.orderStatus;
            order.isPaid = action.payLoad.isPaid;
          }
          return order;
        }),
        OtherOrders: state.OtherOrders.map((order) => {
          if (order._id === action.payLoad._id) {
            order.orderStatus = action.payLoad.orderStatus;
            order.isPaid = action.payLoad.isPaid;
          }
          return order;
        }),
      };

    default:
      return state;
  }
};
