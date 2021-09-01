import React from "react";
import { connect } from "react-redux";

import { deleteFood } from "../../store/actions/FoodsActions";
import classes from "./Food.module.css";

const Food = (props) => {
  const { food } = props;

  return (
    <div className={classes.Food}>
      <div
        className={classes.Image}
        style={{ backgroundImage: `url(${food.image})` }}
      ></div>
      <div className={classes.Details}>
        <div className={classes.NameContainer}>
          <div className={classes.Name}>
            {food.name.length > 20
              ? food.name.substring(0, 20) + "..."
              : food.name}
          </div>
          <div className={classes.Rating}>{food.rating}</div>
        </div>
        <div className={classes.Description}>
          <span>Description:</span> {food.description}
        </div>
        <div className={classes.Category}>
          <span>Category:</span>
          {food.category}
        </div>
        <div className={classes.Price}>
          <span>Fixed Price:</span>
          Rs.{food.fixedPrice}
        </div>
        <div className={classes.Price}>
          <span>Offer Price:</span>
          Rs.{food.offerPrice}
        </div>
        <div className={classes.Price}>
          <span>Packaging Charge:</span>
          Rs.{food.packagingCharge ? food.packagingCharge : 0}
        </div>
      </div>
      <div className={classes.CTAs}>
        <div className={classes.EditBtn} onClick={props.editFood}>
          Edit
        </div>
        <div
          className={classes.DeleteBtn}
          onClick={() => props.deleteFood(food._id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFood: (foodId) => dispatch(deleteFood(foodId)),
  };
};

export default connect(null, mapDispatchToProps)(Food);
