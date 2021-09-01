import React from "react";
import { connect } from "react-redux";

import { toggleActiveRestaurant } from "../../store/actions/RestaurantsActions";
import classes from "./Restaurant.module.css";

const Restaurant = (props) => {
  const { restaurant } = props;
  return (
    <div className={classes.Restaurant}>
      <div
        className={classes.Image}
        style={{ backgroundImage: `url(${restaurant.image})` }}
      ></div>
      <div className={classes.Details}>
        <div className={classes.NameContainer}>
          <div className={classes.Name}>{restaurant.name}</div>
          <div className={classes.Rating}>{restaurant.rating}</div>
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>Email:</div>
          {restaurant.email}
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>City:</div>
          {restaurant.restaurantAddress.city}
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>Timing:</div>
          {restaurant.timing.from + " - " + restaurant.timing.to}
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>Offer Upto:</div>
          {restaurant.offer + "%"}
        </div>
        <div className={classes.CTAs}>
          <div className={classes.EditBtn} onClick={props.editRestaurant}>
            Edit
          </div>
          <div
            className={classes.ActiveBtn}
            style={{ backgroundColor: restaurant.isActive ? "red" : "green" }}
            onClick={() => props.toggleActiveRestaurant(restaurant._id)}
          >
            {restaurant.isActive ? "In Activate" : "Activate"}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleActiveRestaurant: (resId) => dispatch(toggleActiveRestaurant(resId)),
  };
};

export default connect(null, mapDispatchToProps)(Restaurant);
