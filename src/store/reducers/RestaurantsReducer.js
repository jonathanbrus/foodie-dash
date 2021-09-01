import {
  FETCHALLRESTAURANTS,
  ADDRESTAURANT,
  EDITRESTAURANT,
  TOGGLEACTIVERESTAURANT,
  DELETERESTAURANT,
} from "../actions/ActionTypes";

const initialState = {
  AllRestaurants: [],
  TotalRestaurants: 0,
};

export const RestaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHALLRESTAURANTS:
      return {
        ...state,
        AllRestaurants: [...action.payLoad],
        TotalRestaurants: action.payLoad.length,
      };
    case ADDRESTAURANT:
      return {
        ...state,
        AllRestaurants: [action.payLoad, ...state.AllRestaurants],
        TotalRestaurants: state.TotalRestaurants + 1,
      };
    case EDITRESTAURANT:
      return {
        ...state,
        AllRestaurants: state.AllRestaurants.map((res) => {
          if (res._id === action.payLoad._id) {
            res.name = action.payLoad.name;
            res.email = action.payLoad.email;
            res.password = action.payLoad.password;
            res.restaurantAddress.city = action.payLoad.restaurantAddress.city;
            res.geoPoint.lat = action.payLoad.geoPoint.lat;
            res.geoPoint.long = action.payLoad.geoPoint.long;
            res.offer = action.payLoad.offer;
            res.timing.from = action.payLoad.timing.from;
            res.timing.to = action.payLoad.timing.to;
          }
          return res;
        }),
      };

    case TOGGLEACTIVERESTAURANT:
      return {
        ...state,
        AllRestaurants: state.AllRestaurants.map((res) => {
          if (res._id === action.payLoad.resId) {
            res.isActive = action.payLoad.isActive;
          }
          return res;
        }),
      };

    case DELETERESTAURANT:
      return state;

    default:
      return state;
  }
};
