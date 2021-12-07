import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";

import { connect } from "react-redux";

import { orderActions } from "../../store/actions/orders";
import { AppBar } from "../../components/appBar";
import { Loader } from "../../components/ui/loader";
import Order from "./order";

import classes from "./index.module.css";

const OdersPage = (props) => {
  const { fetchOrder, allOrders } = props;

  const [filters, setFilters] = useState({
    selectmenu: selectmenus[0].filter,
  });

  useEffect(() => {
    fetchOrder();
    const polling = setInterval(() => fetchOrder(), 60000);

    return () => {
      clearInterval(polling);
    };
  }, [fetchOrder]);

  const filtered = (food) =>
    allOrders.filter((order) => {
      return filters.selectmenu === "All Orders"
        ? order && order.food === food
        : order.orderStatus.toLowerCase() ===
            filters.selectmenu.toLowerCase() && order.food === food;
    });

  // const breakPoints = {
  //   default: 2,
  //   1100: 1,
  // };

  return (
    <div>
      <AppBar>
        <Header filters={filters} setFilters={setFilters} />
      </AppBar>
      <div style={{ marginTop: "1rem" }}>
        {allOrders.length > 0 ? (
          <div className={classes.Container}>
            <div>
              {filtered(true).map((order) => (
                <Order order={order} key={order._id} />
              ))}
            </div>
            <div>
              {filtered(false).map((order) => (
                <Order order={order} key={order._id} />
              ))}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const Header = ({ filters, setFilters }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Mui.FormControl margin="dense" size="small">
        <Mui.InputLabel id="label">Filter</Mui.InputLabel>
        <Mui.Select
          labelId="label"
          label="Filter"
          autoWidth
          value={filters.selectmenu}
          onChange={(e) =>
            setFilters({ ...filters, selectmenu: e.target.value })
          }
        >
          {selectmenus.map((menu) => (
            <Mui.MenuItem key={menu.filter} value={menu.filter}>
              {menu.title}
            </Mui.MenuItem>
          ))}
        </Mui.Select>
      </Mui.FormControl>
    </div>
  );
};

const selectmenus = [
  { title: "New Orders", filter: "Order Placed" },
  { title: "All Orders", filter: "All Orders" },
  { title: "Confirmed", filter: "Confirmed" },
  { title: "Packed", filter: "Packed" },
  { title: "Out For Delivery", filter: "Out For Delivery" },
  { title: "Delivered", filter: "Delivered" },
  { title: "Canceled", filter: "Canceled" },
];

const mapStateToProps = (state) => {
  return {
    allOrders: state.Orders.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: () => dispatch(orderActions.get()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OdersPage);
