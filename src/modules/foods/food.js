import React, { useState, useEffect } from "react";
import * as Mui from "@mui/material";
import * as Micons from "@mui/icons-material";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { foodActions } from "../../store/actions/foods";
import { AppDialog } from "../../components/appDialog";

const Food = ({ food, deleteFood, toggleAvailability }) => {
  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {}, [food.active]);

  return (
    <>
      <Mui.Card style={styles.card}>
        <Mui.CardMedia
          component="img"
          height="220"
          image={food.image}
          alt={food.name}
        />
        <Mui.IconButton
          style={styles.editbtn}
          onClick={() =>
            history.push(`/foods/update/${food.restaurantId}/${food._id}`)
          }
        >
          <Micons.Edit />
        </Mui.IconButton>
        <div style={styles.container}>
          <Mui.Typography sx={{ fontSize: "1.2rem" }}>
            {food.name}
          </Mui.Typography>
          <Mui.Typography
            sx={{ fontSize: "1rem" }}
            variant="body2"
            color="text.secondary"
          >
            {food.category}
          </Mui.Typography>
          <Mui.Rating
            name="read-only"
            style={{ zIndex: 0 }}
            value={4.5 || food.rating}
            precision={0.1}
            readOnly
          />
          <Mui.Typography variant="body2" color="text.secondary">
            {food.description}
          </Mui.Typography>
          <div style={{ display: "flex" }}>
            <Mui.Typography sx={{ fontSize: 14 }} color="text.secondary">
              <span style={styles.offerPrice}>&#8377;{food.offerPrice}</span>
              <span style={styles.fixedPrice}>&#8377;{food.fixedPrice}</span>
              <span style={styles.divider}>|</span>
              <span style={{ fontSize: "0.8rem" }}>
                <Micons.AccessTime
                  sx={{
                    fontSize: "1rem",
                    margin: "-3.4px 3.4px -3.4px -3.4px",
                  }}
                />
                {moment(food.timing.from, "hh").format("LT")} -{" "}
                {moment(food.timing.to, "hh").format("LT")}
              </span>
            </Mui.Typography>
          </div>
        </div>
        <Mui.CardActions>
          <Mui.IconButton onClick={() => toggleAvailability(food._id)}>
            {food.active ? (
              <Micons.Visibility fontSize="small" />
            ) : (
              <Micons.VisibilityOff fontSize="small" />
            )}
          </Mui.IconButton>
          <Mui.IconButton onClick={() => setToggle((prev) => !prev)}>
            <Micons.Delete />
          </Mui.IconButton>
          <AppDialog
            title="Do you want to delete this Food?"
            open={toggle}
            closeHandler={() => setToggle((prev) => !prev)}
            deleteHandler={() => {
              deleteFood(food._id);
              setToggle((prev) => !prev);
            }}
          />
        </Mui.CardActions>
      </Mui.Card>
    </>
  );
};

const styles = {
  card: {
    position: "relative",
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
  offerPrice: {
    fontSize: "1.2rem",
    color: "#666666",
    marginRight: "0.4rem",
  },
  fixedPrice: {
    color: "#666666",
    textDecoration: "line-through",
  },
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAvailability: (id) => dispatch(foodActions.toggleAvailability(id)),
    deleteFood: (id) => dispatch(foodActions.deleteOne(id)),
  };
};

export default connect(null, mapDispatchToProps)(Food);
