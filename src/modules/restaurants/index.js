import React, { useEffect } from "react";
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

const RestaurantsPage = ({ allRestaurants, getRestaurants }) => {
  // const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (!allRestaurants.length > 0) {
      getRestaurants();
    }
  }, [getRestaurants, allRestaurants]);

  const restaurants =
    // search.length > 0
    //   ? allRestaurants.filter((res) =>
    //       res.name.toLowerCase().includes(search.toLowerCase())
    //     )
    // :
    allRestaurants;

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
      <div>
        {allRestaurants.length > 0 ? (
          <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGrid_column}
          >
            {restaurants.map((restaurant, index) => (
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
    allRestaurants: state.Restaurants.restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: () => dispatch(restaurantActions.get()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);
