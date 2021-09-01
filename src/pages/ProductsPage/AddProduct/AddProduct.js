import React, { useState } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";

import {
  addProduct,
  editProduct,
} from "../../../store/actions/ProductsActions";
import { close } from "../../../svgs";
import classes from "./AddProduct.module.css";

const AddProduct = (props) => {
  const { productData } = props;
  const initialState = {
    name: productData ? productData.name : "",
    image: productData ? productData.image.join(", ") : "",
    description: productData ? productData.description : "",
    productDetail: productData ? productData.productDetail.join(". ") : "",
    category: productData ? productData.category : "",
    itemsInStock: productData ? productData.itemsInStock : "",
    fixedPrice: productData ? productData.fixedPrice : "",
    offerPrice: productData ? productData.offerPrice : "",
    deliveryCharge: productData ? productData.deliveryCharge : "",
  };

  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (productData) {
      props.editProduct(props.category, {
        id: productData._id,
        ...formData,
        image: formData.image
          .split(", ")
          .map((url) => url.trim())
          .filter((url) => url.length > 0),
        productDetail: formData.productDetail
          .split(". ")
          .map((detail) => detail.trim())
          .filter((detail) => detail.length > 0),
      });
    } else {
      props.addProduct(props.category, {
        ...formData,
        image: formData.image
          .split(", ")
          .map((url) => url.trim())
          .filter((url) => url.length > 0),
        productDetail: formData.productDetail
          .split(". ")
          .map((detail) => detail.trim())
          .filter((detail) => detail.length > 0),
      });
    }
    props.setSelectedProd();
    props.switchToggle();
  };

  const variant = {
    initial: {
      x: "100%",
    },
    animate: {
      x: 0,
    },
    exit: {
      x: "100%",
    },
  };

  return (
    <motion.div
      variants={variant}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween" }}
      className={classes.AddFood}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={classes.CloseBTN} onClick={props.switchToggle}>
        {close}
      </div>
      <form className={classes.FormContainer} onSubmit={onSubmitHandler}>
        <div className={classes.FormField}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={onChangeHandler}
            placeholder="Product Name"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="image">Image URL</label>
          <input
            name="image"
            type="text"
            value={formData.image}
            onChange={onChangeHandler}
            placeholder="Food Image URL"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={onChangeHandler}
            placeholder="Description"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="productDetail">Product Detail</label>
          <input
            name="productDetail"
            type="text"
            value={formData.productDetail}
            onChange={onChangeHandler}
            placeholder="Product Detail"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="category">Category</label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={onChangeHandler}
            placeholder="Category"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="category">No.of Items in stock</label>
          <input
            name="itemsInStock"
            type="text"
            value={formData.itemsInStock}
            onChange={onChangeHandler}
            placeholder="No.of Items in stock"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="fixedPrice">Fixed Price</label>
          <input
            name="fixedPrice"
            type="text"
            value={formData.fixedPrice}
            onChange={onChangeHandler}
            placeholder="Fixed Price"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="offerPrice">Offer Price</label>
          <input
            name="offerPrice"
            type="text"
            value={formData.offerPrice}
            onChange={onChangeHandler}
            placeholder="Offer Price"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="deliveryCharge">Delivery Charge</label>
          <input
            name="deliveryCharge"
            type="text"
            value={formData.deliveryCharge}
            onChange={onChangeHandler}
            placeholder="Delivery Charge"
            required
          />
        </div>
        <button className={classes.SubmitBTN} type="submit">
          Submit
        </button>
      </form>
    </motion.div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (category, prodInfo) =>
      dispatch(addProduct(category, prodInfo)),
    editProduct: (category, prodInfo) =>
      dispatch(editProduct(category, prodInfo)),
  };
};

export default connect(null, mapDispatchToProps)(AddProduct);
