import axios from "axios";

import {
  FETCHPRODUCTS,
  ADDPRODUCT,
  EDITPRODUCT,
  DELETEPRODUCT,
} from "./ActionTypes";

export const fetchProducts = (category) => (dispatch) => {
  axios
    .get("https://alofoodie-v2.herokuapp.com/getAllProductsByCategory", {
      params: {
        category: category,
      },
    })
    .then((res) =>
      dispatch({ type: FETCHPRODUCTS, payLoad: res.data.products })
    )
    .catch((err) => console.log(err));
};

export const addProduct = (category, prodInfo) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/addNewProduct", {
      category: category,
      prodInfo: prodInfo,
    })
    .then((res) =>
      dispatch({ type: ADDPRODUCT, payLoad: res.data.addedProduct })
    )
    .catch((err) => console.log(err));
};

export const editProduct = (category, prodInfo) => (dispatch) => {
  axios
    .post("https://alofoodie-v2.herokuapp.com/admin/updateProduct", {
      category: category,
      prodInfo: prodInfo,
    })
    .then((res) =>
      dispatch({ type: EDITPRODUCT, payLoad: res.data.updatedProduct })
    )
    .catch((err) => console.log(err));
};

export const deleteProduct = (prodId) => (dispatch) => {
  axios
    .delete("https://alofoodie-v2.herokuapp.com/admin/deleteProduct", {
      params: { prodId: prodId },
    })
    .then((res) => dispatch({ type: DELETEPRODUCT, payLoad: prodId }))
    .catch((err) => console.log(err));
};
