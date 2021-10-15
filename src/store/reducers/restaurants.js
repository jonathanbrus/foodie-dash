import { restaurantTypes } from "../actions/actionTypes";

const initialState = {
  restaurants: [],
};

export const RestaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantTypes.get:
      return {
        ...state,
        restaurants: [...action.payLoad],
      };

    case restaurantTypes.create:
      return {
        ...state,
        restaurants: [action.payLoad, ...state.restaurants],
      };

    case restaurantTypes.updateOne:
      return {
        ...state,
        restaurants: state.restaurants.map((res) => {
          if (res._id === action.payLoad._id) {
            res.name = action.payLoad.name;
            res.email = action.payLoad.email;
            res.password = action.payLoad.password;
            res.city = action.payLoad.city;
            res.geoPoint.lat = action.payLoad.geoPoint.lat;
            res.geoPoint.long = action.payLoad.geoPoint.long;
            res.offer = action.payLoad.offer;
            res.timing.from = action.payLoad.timing.from;
            res.timing.to = action.payLoad.timing.to;
          }
          return res;
        }),
      };

    case restaurantTypes.deleteOne:
      return state;

    case restaurantTypes.toggle:
      return {
        ...state,
        restaurants: state.restaurants.map((res) => {
          if (res._id === action.payLoad.id) {
            res.active = action.payLoad.active;
          }
          return res;
        }),
      };

    default:
      return state;
  }
};
