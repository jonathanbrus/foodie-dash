import { foodTypes } from "../actions/actionTypes";

const initialState = {
  foods: [],
};

export const FoodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case foodTypes.get:
      return {
        ...state,
        foods: [...action.payLoad],
      };

    case foodTypes.create:
      return {
        ...state,
        foods: [action.payLoad, ...state.foods],
      };

    case foodTypes.updateOne:
      return {
        ...state,
        foods: state.foods.map((food) => {
          if (food._id === action.payLoad._id) {
            food.name = action.payLoad.name;
            food.image = action.payLoad.image;
            food.description = action.payLoad.description;
            food.category = action.payLoad.category;
            food.fixedPrice = action.payLoad.fixedPrice;
            food.offerPrice = action.payLoad.offerPrice;
            food.timing.from = action.payLoad.timing.from;
            food.timing.to = action.payLoad.timing.to;
            food.packagingCharge = action.payLoad.packagingCharge;
          }
          return food;
        }),
      };

    case foodTypes.deleteOne:
      return {
        ...state,
        foods: state.foods.filter((food) => food._id !== action.payLoad),
      };

    case foodTypes.toggle:
      return {
        ...state,
        foods: state.foods.map((food) => {
          if (food._id === action.payLoad.id) {
            food.active = action.payLoad.active;
          }
          return food;
        }),
      };

    default:
      return state;
  }
};
