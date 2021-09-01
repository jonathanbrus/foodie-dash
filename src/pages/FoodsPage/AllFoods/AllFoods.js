import React from "react";

import Food from "../../../components/Food/Food";
import classes from "./AllFoods.module.css";

const AllFoods = (props) => {
  const { AllFoods } = props;

  return AllFoods.length > 0 ? (
    <div className={classes.AllFoods}>
      {AllFoods.map((food, index) => (
        <Food key={index} food={food} editFood={() => props.editFood(food)} />
      ))}
    </div>
  ) : (
    <div className={classes.Empty}>Select a Restaurant</div>
  );
};

export default AllFoods;
