import {
  FETCHPRODUCTS,
  ADDPRODUCT,
  EDITPRODUCT,
  DELETEPRODUCT,
} from "../actions/ActionTypes";

const initialState = {
  AllProducts: [],
  TotalProducts: 0,
};

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHPRODUCTS:
      return {
        ...state,
        AllProducts: action.payLoad,
        TotalProducts: action.payLoad.length,
      };
    case ADDPRODUCT:
      return {
        ...state,
        AllProducts: [action.payLoad, ...state.AllProducts],
        TotalProducts: state.TotalProducts + 1,
      };
    case EDITPRODUCT:
      return {
        ...state,
        AllProducts: state.AllProducts.map((prod) => {
          if (prod._id === action.payLoad._id) {
            prod.name = action.payLoad.name;
            prod.image = action.payLoad.image;
            prod.description = action.payLoad.description;
            prod.productDetail = action.payLoad.productDetail;
            prod.category = action.payLoad.category;
            prod.subCategory = action.payLoad.subCategory;
            prod.fixedPrice = action.payLoad.fixedPrice;
            prod.offerPrice = action.payLoad.offerPrice;
            prod.deliveryCharge = action.payLoad.deliveryCharge;
            prod.itemsInStock = action.payLoad.itemsInStock;
          }
          return prod;
        }),
      };

    case DELETEPRODUCT:
      return {
        ...state,
        AllProducts: state.AllProducts.filter(
          (prod) => prod._id !== action.payLoad
        ),
      };

    default:
      return state;
  }
};
