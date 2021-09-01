import React from "react";

import Orders from "../OrdersPage/Orders/Orders";
import classes from "./HomePage.module.css";

const HomePage = (props) => {
  return (
    <div className={classes.HomePage}>
      <div className={classes.Header}>
        <div className={classes.Sections}>Total Orders {1}</div>
        <div className={classes.Sections}>Total Foods {1}</div>
        <div className={classes.Sections}>Total Products {1}</div>
        <div className={classes.Sections}>Total Restaurants {1}</div>
      </div>
      <div className={classes.Body}>
        <div></div>
        <Orders title="New Orders" />
      </div>
    </div>
  );
};

export default HomePage;
