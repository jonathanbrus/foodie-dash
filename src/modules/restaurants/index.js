import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Masonry from "react-masonry-css";

import { restaurantActions } from "../../store/actions/restaurants";
import { AppBar } from "../../components/appBar";
import { Loader } from "../../components/ui/loader";
import Restaurant from "./restaurant";
import classes from "./index.module.css";
import SearchBar from "../../components/ui/searchBar/searchBar";

const RestaurantsPage = ({ restaurants, getRestaurants }) => {
  const history = useHistory();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!restaurants.length > 0) {
      getRestaurants();
    }
  }, [getRestaurants, restaurants]);

  let filteredRestaurants =
    search.length > 0
      ? restaurants.filter((res) =>
          res.name.toLowerCase().includes(search.toLowerCase())
        )
      : restaurants;

  const addRestaurant = () => {
    history.push("/restaurant/create");
  };

  return (
    <div>
      <AppBar>
        <IconButton onClick={addRestaurant}>
          <Add />
        </IconButton>
      </AppBar>
      <SearchBar
        value={search}
        setValue={setSearch}
        placeholder="Search by name"
      />
      <div>
        {restaurants.length > 0 ? (
          <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGrid_column}
          >
            {filteredRestaurants.map((restaurant, index) => (
              <Restaurant key={index} restaurant={restaurant} />
            ))}
          </Masonry>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

const breakPoints = {
  default: 3,
  1150: 2,
  850: 1,
};

const mapStateToProps = (state) => {
  return {
    restaurants: state.Restaurants.restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: () => dispatch(restaurantActions.get()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);
