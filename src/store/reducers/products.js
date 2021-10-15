import { productTypes } from "../actions/actionTypes";

const initialState = {
  products: [],
};

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.get:
      return {
        ...state,
        products: action.payLoad,
      };

    case productTypes.create:
      return {
        ...state,
        products: [action.payLoad, ...state.products],
      };

    case productTypes.updateOne:
      return {
        ...state,
        products: state.products.map((prod) => {
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

    case productTypes.deleteOne:
      return {
        ...state,
        products: state.products.filter((prod) => prod._id !== action.payLoad),
      };

    default:
      return state;
  }
};
