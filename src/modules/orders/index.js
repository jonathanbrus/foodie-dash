import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import { connect } from "react-redux";
import Masonry from "react-masonry-css";

import { orderActions } from "../../store/actions/orders";
import { AppBar } from "../../components/appBar";
import { Loader } from "../../components/ui/loader";
import Order from "./order";
import notifysound from "../../assets/notify.mp3";

import classes from "./index.module.css";

const OdersPage = (props) => {
  const { fetchOrder, allOrders } = props;

  const [filters, setFilters] = useState({
    mainmenu: mainmenus[0],
    selectmenu: selectmenus[0].filter,
  });

  const count = allOrders.filter(
    (order) => order.orderStatus.toLowerCase() === "order placed"
  ).length;

  const [newOrderCount, setNewOrderCount] = useState(count);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    fetchOrder();
    const polling = setInterval(() => fetchOrder(), 60000);

    return () => {
      clearInterval(polling);
    };
  }, [fetchOrder]);

  const filtered = allOrders.filter(
    (order) =>
      order.orderStatus.toLowerCase() === filters.selectmenu.toLowerCase() &&
      (order.food === (filters.mainmenu === "Foods") ||
        filters.mainmenu === "All")
  );

  useEffect(() => {
    window.addEventListener("mousemove", () => setCanPlay(true));

    if (newOrderCount < count && canPlay) {
      new Audio(notifysound).play();
    }

    setNewOrderCount(count);
  }, [canPlay, count, newOrderCount]);

  const breakPoints = {
    default: 2,
    1100: 1,
  };

  return (
    <div>
      <AppBar>
        <Header filters={filters} setFilters={setFilters} />
      </AppBar>
      <div style={{ marginTop: "1rem" }}>
        {allOrders.length > 0 ? (
          <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGrid_column}
          >
            {filtered.map((order) => (
              <Order order={order} key={order._id} />
            ))}
          </Masonry>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const Header = ({ filters, setFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null);

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
      <div style={{ width: "1rem" }}></div>
      <Mui.IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </Mui.IconButton>
      <Mui.Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {mainmenus.map((menu) => (
          <Mui.MenuItem
            key={menu}
            onClick={() => {
              setFilters({ ...filters, mainmenu: menu });
              setAnchorEl(null);
            }}
          >
            {menu}
          </Mui.MenuItem>
        ))}
      </Mui.Menu>
    </div>
  );
};

const selectmenus = [
  { title: "New Orders", filter: "Order Placed" },
  { title: "Confirmed", filter: "Confirmed" },
  { title: "Packed", filter: "Packed" },
  { title: "Out For Delivery", filter: "Out For Delivery" },
  { title: "Delivered", filter: "Delivered" },
];

const mainmenus = ["All", "Foods", "Products"];

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
