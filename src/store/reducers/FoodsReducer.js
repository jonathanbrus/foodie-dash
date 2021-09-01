import {
  FETCHALLFOODS,
  ADDFOOD,
  EDITFOOD,
  DELETEFOOD,
} from "../actions/ActionTypes";

const initialState = {
  AllFoods: [],
  TotalFoods: 0,
};

export const FoodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHALLFOODS:
      return {
        ...state,
        AllFoods: [...action.payLoad],
        TotalFoods: action.payLoad.length,
      };
    case ADDFOOD:
      return {
        ...state,
        AllFoods: [action.payLoad, ...state.AllFoods],
        TotalFoods: state.TotalFoods + 1,
      };
    case EDITFOOD:
      return {
        ...state,
        AllFoods: state.AllFoods.map((food) => {
          if (food._id === action.payLoad._id) {
            food.name = action.payLoad.name;
            food.image = action.payLoad.image;
            food.description = action.payLoad.description;
            food.category = action.payLoad.category;
            food.fixedPrice = action.payLoad.fixedPrice;
            food.offerPrice = action.payLoad.offerPrice;
            food.availabilityTiming.from =
              action.payLoad.availabilityTiming.from;
            food.availabilityTiming.to = action.payLoad.availabilityTiming.to;
            food.packagingCharge = action.payLoad.packagingCharge;
          }
          return food;
        }),
      };

    case DELETEFOOD:
      return {
        ...state,
        AllFoods: state.AllFoods.filter((food) => food._id !== action.payLoad),
      };

    default:
      return state;
  }
};
