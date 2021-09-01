import React, { useState } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";

import {
  addRestaurant,
  editRestaurant,
} from "../../../store/actions/RestaurantsActions";
import { close } from "../../../svgs";
import classes from "./AddRestaurant.module.css";

const AddRestaurant = (props) => {
  const { resData } = props;

  const initialState = {
    name: resData ? resData.name : "",
    image: resData ? resData.image : "",
    email: resData ? resData.email : "",
    password: resData ? resData.password : "",
    city: resData ? resData.restaurantAddress.city : "",
    timing: {
      from: resData ? resData.timing.from : "",
      to: resData ? resData.timing.to : "",
    },
    lat: resData ? resData.geoPoint.lat : "",
    long: resData ? resData.geoPoint.long : "",
    offer: resData ? resData.offer : "",
  };

  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = (e) => {
    let { value, name } = e.target;

    if (name === "from" || name === "to") {
      setFormData({
        ...formData,
        timing: { ...formData.timing, [name]: value },
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
    if (resData) {
      props.editRestaurant({ ...formData, id: resData._id });
    } else {
      props.addRestaurant(formData);
    }
    props.selectedRestaurant();
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
      className={classes.AddRestaurant}
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
            placeholder="Restaurant Name"
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
            placeholder="Restaurant Image URL"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Password"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="city">City</label>
          <input
            name="city"
            type="text"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="Address"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="lat">Latitude</label>
          <input
            name="lat"
            type="text"
            value={formData.lat}
            onChange={onChangeHandler}
            placeholder="Latitude"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="long">Longitude</label>
          <input
            name="long"
            type="text"
            value={formData.long}
            onChange={onChangeHandler}
            placeholder="Longitude"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="offer">Offer</label>
          <input
            name="offer"
            type="text"
            value={formData.offer}
            onChange={onChangeHandler}
            placeholder="Offer"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="from">Available from</label>
          <input
            name="from"
            type="text"
            value={formData.timing.from}
            onChange={onChangeHandler}
            placeholder="In 24hrs format"
            required
          />
        </div>
        <div className={classes.FormField}>
          <label htmlFor="to">Available to</label>
          <input
            name="to"
            type="text"
            value={formData.timing.to}
            onChange={onChangeHandler}
            placeholder="In 24hrs format"
            required
          />
        </div>
        <button className={classes.SubmitBTN} type="submit">
          Submit
        </button>
      </form>
      <div></div>
    </motion.div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRestaurant: (restaurantInfo) => dispatch(addRestaurant(restaurantInfo)),
    editRestaurant: (restaurantInfo) =>
      dispatch(editRestaurant(restaurantInfo)),
  };
};

export default connect(null, mapDispatchToProps)(AddRestaurant);
