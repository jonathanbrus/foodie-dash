import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import Masonry from "react-masonry-css";

import { foodActions } from "../../store/actions/foods";
import { AppBar } from "../../components/appBar";
import { Loader } from "../../components/ui/loader";
import Food from "./food";
import classes from "./index.module.css";

const FoodsPage = ({ fetchFoods, foods }) => {
  const history = useHistory();
  const { restaurantId } = useParams();

  // const [search, setSearch] = useState("");

  useEffect(() => {
    fetchFoods(restaurantId);
  }, [fetchFoods, restaurantId]);

  const createFood = () => {
    history.push(`/foods/create/${restaurantId}`);
  };

  const filteredFoods =
    // search.length > 0
    //   ? foods.filter((food) => food.name.includes(search.toLowerCase())) :
    foods;

  return (
    <div>
      <AppBar>
        <IconButton onClick={createFood}>
          <Add />
        </IconButton>
      </AppBar>
      <div>
        {foods.length > 0 ? (
          <Masonry
            breakpointCols={breakPoints}
            className={classes.myMasonryGrid}
            columnClassName={classes.myMasonryGrid_column}
          >
            {filteredFoods.map((food) => (
              <Food key={food._id} food={food} />
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
    foods: state.Foods.foods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFoods: (id) => dispatch(foodActions.get(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodsPage);
