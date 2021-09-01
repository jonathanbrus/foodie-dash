import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { FetchSetOrders } from "../../../store/actions/OrdersActions";

import classes from "./Orders.module.css";
import OrderListItem from "../../../components/Order/Order";

const RecentOrders = (props) => {
  const { fetchOrder, AllOrders, FoodOrders, OtherOrders, title } = props;

  const [timer, setTimer] = useState(0);
  const [unmounted, setUnmounted] = useState(false);

  if (!unmounted) {
    setInterval(() => setTimer((prev) => prev + 1), 60000);
  }

  useEffect(() => {
    if (!unmounted) {
      fetchOrder();
    }
    return () => {
      setUnmounted(true);
    };
  }, [fetchOrder, timer, unmounted]);

  const [displayedOrders, setDisplayedOrders] = useState([]);

  useEffect(() => {
    switch (title) {
      case "New Orders":
        setDisplayedOrders(
          AllOrders.filter(
            (order) => order.orderStatus.toLowerCase() === "order placed"
          )
        );
        break;
      case "Food Orders":
        setDisplayedOrders(FoodOrders);
        break;
      case "Other Orders":
        setDisplayedOrders(OtherOrders);
        break;
      default:
        setDisplayedOrders(AllOrders);
        break;
    }
  }, [AllOrders, FoodOrders, OtherOrders, title]);

  return (
    <div className={classes.RecentOrders}>
      <div className={classes.Header}>{title}</div>
      <div className={classes.Container}>
        {AllOrders.length > 0 ? (
          displayedOrders.length > 0 ? (
            displayedOrders.map((order) => (
              <OrderListItem order={order} key={order._id} />
            ))
          ) : (
            <div>No Orders</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllOrders: state.Orders.AllOrders,
    FoodOrders: state.Orders.FoodOrders,
    OtherOrders: state.Orders.OtherOrders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(FetchSetOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentOrders);
