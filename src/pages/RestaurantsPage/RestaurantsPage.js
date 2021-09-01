import React, { useState } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";

import classes from "./RestaurantsPage.module.css";
import AddRestaurant from "./AddRestaurant/AddRestaurant";
import Restaurant from "../../components/Restaurant/Restaurant";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import AddButton from "../../components/UI/AddButton/AddButton";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const RestaurantsPage = (props) => {
  const { allRestaurants } = props;
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRestaurant, setRes] = useState(null);

  const restaurants =
    search.length > 0
      ? allRestaurants.filter((res) =>
          res.name.toLowerCase().includes(search.toLowerCase())
        )
      : allRestaurants;

  const addRestaurant = () => {
    setRes(null);
    setToggle(true);
  };

  const editRestaurant = (restaurant) => {
    setRes(restaurant);
    setToggle(true);
  };

  return (
    <div className={classes.RestaurantsPage}>
      <AnimatePresence>
        {toggle ? (
          <Backdrop onClick={() => setToggle(false)}>
            <AddRestaurant
              switchToggle={() => setToggle(false)}
              selectedRestaurant={() => setRes(null)}
              resData={selectedRestaurant ? selectedRestaurant : null}
            />
          </Backdrop>
        ) : null}
      </AnimatePresence>
      <div className={classes.Header}>
        <SearchBar
          onChange={(search) => setSearch(search)}
          placeholder="Search By Name"
        />
        <div>Total Restaurants: {allRestaurants.length}</div>
        <AddButton title="Add Restaurant" onClick={addRestaurant} />
      </div>
      <div className={classes.AllRestaurants}>
        {allRestaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <Restaurant
              key={index}
              restaurant={restaurant}
              editRestaurant={() => editRestaurant(restaurant)}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allRestaurants: state.Restaurants.AllRestaurants,
  };
};

export default connect(mapStateToProps)(RestaurantsPage);
