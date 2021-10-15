import React, { useState } from "react";
import * as Mui from "@mui/material";

import { connect } from "react-redux";
import { useHistory, useParams, Prompt } from "react-router-dom";

import { prodcutActions } from "../../store/actions/products";
import { findOneById } from "../utils";
import { AppBar } from "../../components/appBar";
import { Form, OptionField, TextField } from "../../components/ui/form/form";

const AddProduct = ({ findProduct, createProduct, updateOneProduct }) => {
  const { category, productId } = useParams();
  const history = useHistory();
  const product = findProduct(productId);

  const [formData, setFormData] = useState(initialState(product, category));

  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setSwitch = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const addOption = (name, option) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], option],
    });
  };

  const deleteOption = (name, index) => {
    formData[name].splice(index, 1);
    setFormData({
      ...formData,
      [name]: formData[name].length === 0 ? [] : [...formData[name]],
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    !product
      ? createProduct(category, formData)
      : updateOneProduct(product.category, { ...formData, id: product._id });
    history.goBack();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Prompt message="Are you sure you want to leave this page?" />
      <AppBar />
      <Form submitHandler={onSubmitHandler}>
        <TextField
          value={formData.name}
          changeHandler={onChangeHandler}
          title="Name"
          name="name"
          type="text"
          placeholder="Enter the name"
        />
        <OptionField
          title="Image"
          name="image"
          options={formData.image}
          addOption={addOption}
          deleteOption={deleteOption}
          other
        />
        <TextField
          value={formData.description}
          changeHandler={onChangeHandler}
          title="Description"
          name="description"
          type="text"
          placeholder="Enter the description"
        />
        <OptionField
          title="Product Detail"
          name="productDetail"
          options={formData.productDetail}
          addOption={addOption}
          deleteOption={deleteOption}
          other
        />
        <TextField
          value={formData.subCategory}
          changeHandler={onChangeHandler}
          title="Category"
          name="subCategory"
          type="text"
          placeholder="Enter the category"
        />
        <TextField
          value={formData.itemsInStock}
          changeHandler={onChangeHandler}
          title="Items In Stock"
          name="itemsInStock"
          type="text"
          placeholder="Enter the number of items"
        />
        <TextField
          value={formData.fixedPrice}
          changeHandler={onChangeHandler}
          title="Fixed Price"
          name="fixedPrice"
          type="text"
          placeholder="Enter the Fixed Price"
        />
        <TextField
          value={formData.offerPrice}
          changeHandler={onChangeHandler}
          title="Offer Price"
          name="offerPrice"
          type="text"
          placeholder="Enter the Offer Price"
        />
        <Mui.Box
          sx={{
            padding: "0.6rem 1rem 0 1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div htmlFor="bestSeller">Best seller</div>
          <Mui.Checkbox
            size="small"
            name={"bestSeller"}
            checked={formData.bestSeller}
            onChange={setSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Mui.Box>
      </Form>
    </div>
  );
};

const initialState = (product, category) => {
  return {
    name: product ? product.name : "",
    image: product ? product.image : "",
    description: product ? product.description : "",
    productDetail: product ? product.productDetail : "",
    category: product ? product.category : category,
    subCategory: product ? product.subCategory : "",
    itemsInStock: product ? `${product.itemsInStock}` : "",
    fixedPrice: product ? `${product.fixedPrice}` : "",
    offerPrice: product ? `${product.offerPrice}` : "",
    bestSeller: product ? product.bestSeller : false,
  };
};

const mapStateToProps = (state) => {
  return {
    findProduct: (id) => findOneById(id, state.Products.products),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (category, prodInfo) =>
      dispatch(prodcutActions.create(category, prodInfo)),
    updateOneProduct: (category, prodInfo) =>
      dispatch(prodcutActions.updateOne(category, prodInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
