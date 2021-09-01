import React, { useState } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";

import { addFood, editFood } from "../../../store/actions/FoodsActions";
import { close } from "../../../svgs";
import classes from "./AddFood.module.css";

const AddFood = (props) => {
  const { foodData, selectedRes } = props;
  const initialState = {
    name: foodData ? foodData.name : "",
    image: foodData ? foodData.image : "",
    description: foodData ? foodData.description : "",
    category: foodData ? foodData.category : "",
    fixedPrice: foodData ? foodData.fixedPrice : "",
    offerPrice: foodData ? foodData.offerPrice : "",
    packagingCharge: foodData
      ? foodData.packagingCharge
        ? foodData.packagingCharge
        : 0
      : "",
    availabilityTiming: {
      from: foodData ? foodData.availabilityTiming.from : "",
      to: foodData ? foodData.availabilityTiming.to : "",
    },
    restaurantId: selectedRes,
  };

  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    if (name === "from" || name === "to") {
      setFormData({
        ...formData,
        availabilityTiming: {
          ...formData.availabilityTiming,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (foodData) {
      props.editFood({ id: foodData._id, ...formData });
    } else {
      props.addFood(formData);
    }
    props.setSelectedFood();
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
            placeholder="Food Name"
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
          <label htmlFor="packagingCharge">Package Charge</label>
          <input
            name="packagingCharge"
            type="text"
            value={formData.packagingCharge}
            onChange={onChangeHandler}
            placeholder="Package Charge"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="from">Available From</label>
          <input
            name="from"
            type="text"
            value={formData.availabilityTiming.from}
            onChange={onChangeHandler}
            placeholder="In 24hrs format"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="to">Available To</label>
          <input
            name="to"
            type="text"
            value={formData.availabilityTiming.to}
            onChange={onChangeHandler}
            placeholder="In 24hrs format"
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
    addFood: (foodInfo) => dispatch(addFood(foodInfo)),
    editFood: (foodInfo) => dispatch(editFood(foodInfo)),
  };
};

export default connect(null, mapDispatchToProps)(AddFood);
