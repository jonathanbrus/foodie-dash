import React from "react";
import { connect } from "react-redux";

import Orders from "./Orders/Orders";
import classes from "./OrdersPage.module.css";

const OdersPage = (props) => {
  const { TotalOrders, DeliveredOrders, PendingOrders } = props;
  return (
    <div className={classes.OrdersPage}>
      <div className={classes.Header}>
        <div className={classes.Sections}>Total Orders {TotalOrders}</div>
        <div className={classes.Sections}>New Orders {PendingOrders}</div>
        <div className={classes.Sections}>Delivered {DeliveredOrders}</div>
        <div className={classes.Sections}>Canceled {DeliveredOrders}</div>
      </div>
      <div className={classes.Body}>
        <Orders title="Food Orders" />
        <Orders title="Other Orders" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    TotalOrders: state.Orders.TotalOrders,
    DeliveredOrders: state.Orders.AllOrders.filter(
      (order) => order.orderStatus.toLowerCase() === "delivered"
    ).length,
    PendingOrders: state.Orders.AllOrders.filter(
      (order) => order.orderStatus.toLowerCase() !== "delivered"
    ).length,
  };
};

export default connect(mapStateToProps)(OdersPage);
