import React from "react";
import { withRouter } from "react-router-dom";

import classes from "./SideNavBar.module.css";

const SideNavBar = (props) => {
  const navigate = (link) => {
    if (props.location.pathname !== link) {
      props.history.push(link);
    }
  };

  return (
    <div className={classes.SideNavBar}>
      <div className={classes.Header}>
        <div>AloFoodie</div>
        <span>Dashboard</span>
      </div>
      <div className={classes.NavContainer}>
        <div className={classes.Link} onClick={() => navigate("/")}>
          Home
        </div>
        <div className={classes.Link} onClick={() => navigate("/Orders")}>
          Orders
        </div>
        <div className={classes.Link} onClick={() => navigate("/Foods")}>
          Foods
        </div>
        <div className={classes.Link} onClick={() => navigate("/Products")}>
          Products
        </div>
        <div className={classes.Link} onClick={() => navigate("/Restaurants")}>
          Restaurants
        </div>
      </div>
    </div>
  );
};

export default withRouter(SideNavBar);
