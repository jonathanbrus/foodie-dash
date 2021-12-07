import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import * as Micons from "@mui/icons-material";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { restaurantActions } from "../../store/actions/restaurants";
import { AppDialog } from "../../components/appDialog";

const Restaurant = ({ restaurant, toggleAvailability, deleteRestaurant }) => {
  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {}, [restaurant.active]);

  return (
    <Mui.Card style={styles.card}>
      <Mui.CardMedia
        component="img"
        height="220"
        image={restaurant.image}
        alt={restaurant.name}
      />
      <Mui.IconButton
        style={styles.editbtn}
        onClick={() => history.push(`/restaurant/update/${restaurant._id}`)}
      >
        <Micons.Edit fontSize="small" />
      </Mui.IconButton>
      <div style={styles.offer}>{`${restaurant.offer}% OFF`}</div>
      <div style={styles.container}>
        <Mui.Typography sx={{ fontSize: "1.2rem" }}>
          {restaurant.name}
        </Mui.Typography>
        <Mui.Rating
          sx={{
            zIndex: "0",
          }}
          name="read-only"
          value={restaurant.rating}
          precision={0.1}
          readOnly
        />
        <Mui.Typography variant="body2" color="text.secondary">
          {restaurant.email}
        </Mui.Typography>
        <Mui.Typography sx={{ fontSize: 14 }} color="text.secondary">
          <span style={{ display: "flex", alignItems: "center" }}>
            <span>{restaurant.city}</span>
            <span style={styles.divider}>|</span>
            <span>
              <Micons.AccessTime
                sx={{ fontSize: "1rem", margin: "-3.4px 3.4px -3.4px -3.4px" }}
              />
              <span style={{ fontSize: "0.8rem" }}>
                {moment(restaurant.timing.from, "hh").format("LT")} -{" "}
                {moment(restaurant.timing.to, "hh").format("LT")}
              </span>
            </span>
          </span>
        </Mui.Typography>
      </div>
      <Mui.CardActions>
        <Mui.Stack width="100%" direction="row" justifyContent="space-between">
          <Mui.Button
            size="small"
            onClick={() => history.push(`/foods/${restaurant._id}`)}
          >
            View Foods
          </Mui.Button>
          <Mui.Stack direction="row">
            <Mui.IconButton onClick={() => toggleAvailability(restaurant._id)}>
              {restaurant.active ? (
                <Micons.Visibility fontSize="small" />
              ) : (
                <Micons.VisibilityOff fontSize="small" />
              )}
            </Mui.IconButton>
            <Mui.IconButton onClick={() => setToggle((prev) => !prev)}>
              <Micons.Delete fontSize="small" />
            </Mui.IconButton>
          </Mui.Stack>
        </Mui.Stack>
        <AppDialog
          title="Do you want to delete this Restaurant?"
          open={toggle}
          closeHandler={() => setToggle((prev) => !prev)}
          deleteHandler={() => {
            deleteRestaurant(restaurant._id);
            setToggle((prev) => !prev);
          }}
        />
      </Mui.CardActions>
    </Mui.Card>
  );
};

const styles = {
  card: {
    position: "relative",
    zIndex: 0,
  },
  editbtn: {
    position: "absolute",
    top: "0.8rem",
    right: "0.8rem",
    color: "black",
    backgroundColor: "white",
  },
  offer: {
    position: "absolute",
    top: "180px",
    left: "0rem",
    padding: "0.2rem 0.8rem",
    fontSize: "0.96rem",
    color: "white",
    backgroundColor: "green",
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
  },
  container: {
    margin: "0.8rem 0.8rem 0 0.8rem",
  },
  divider: {
    margin: "0 0.6rem",
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAvailability: (id, city) =>
      dispatch(restaurantActions.toggleAvailability(id, city)),
    deleteRestaurant: (id) => dispatch(restaurantActions.deleteOne(id)),
  };
};

export default connect(null, mapDispatchToProps)(Restaurant);
