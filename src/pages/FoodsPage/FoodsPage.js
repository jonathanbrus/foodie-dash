import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";

import { fetchSetFoods } from "../../store/actions/FoodsActions";

import classes from "./FoodsPage.module.css";
import AllFoods from "./AllFoods/AllFoods";
import AddFood from "./AddFood/AddFood";

import SearchBar from "../../components/UI/SearchBar/SearchBar";
import DrowpDownSelection from "../../components/UI/DropDownSelection/DropDownSelection";
import AddButton from "../../components/UI/AddButton/AddButton";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const FoodsPage = (props) => {
  const { Restaurants } = props;
  const [toggle, setToggle] = useState(false);
  const [selectedRes, setSelectedRes] = useState("");
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  const { fetchFoods } = props;

  const addFood = () => {
    if (selectedRes.length > 0) {
      setSelectedFood(null);
      setToggle(true);
    }
  };

  const editFood = (food) => {
    setSelectedFood(food);
    setToggle(true);
  };

  useEffect(() => {
    if (selectedRes.length > 0) {
      fetchFoods(selectedRes);
    }
  }, [selectedRes, fetchFoods]);

  return (
    <div className={classes.FoodsPage}>
      <AnimatePresence>
        {toggle ? (
          <Backdrop onClick={() => setToggle(false)}>
            <AddFood
              switchToggle={() => setToggle(false)}
              setSelectedFood={() => setSelectedFood(null)}
              foodData={selectedFood ? selectedFood : null}
              selectedRes={selectedRes}
            />
          </Backdrop>
        ) : null}
      </AnimatePresence>
      <div className={classes.Header}>
        <SearchBar
          onChange={(search) => setSearch(search)}
          placeholder="Search By Name"
        />
        <div className={classes.DropDownFilter}>
          <DrowpDownSelection
            Items={Restaurants}
            setSelection={(selected) => setSelectedRes(selected.id)}
            placeHolder={"Select Restaurant"}
          />
        </div>
        <div style={{ flex: 1 }}>
          Total Foods: {props.AllFoods ? props.AllFoods.length : 0}
        </div>
        <AddButton title="Add Food" onClick={addFood} />
      </div>
      <AllFoods
        editFood={editFood}
        AllFoods={
          search.length > 0
            ? props.AllFoods.filter(
                (food) =>
                  food.name.toLowerCase().includes(search.toLowerCase()) && food
              )
            : props.AllFoods
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    AllFoods: state.Foods.AllFoods,
    Restaurants: [
      ...new Set(
        state.Restaurants.AllRestaurants.map((restaurant) => ({
          name: restaurant.name,
          id: restaurant._id,
        }))
      ),
    ],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFoods: (resId) => dispatch(fetchSetFoods(resId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsPage);
