import React, { useState } from "react";
import * as Mui from "@mui/material";

import { connect } from "react-redux";
import { useHistory, useParams, Prompt } from "react-router-dom";

import { restaurantActions } from "../../store/actions/restaurants";
import { findOneById } from "../utils";
import { AppBar } from "../../components/appBar";
import { Form, OptionField, TextField } from "../../components/ui/form/form";

const AddRestaurant = ({
  findRestaurant,
  createRestaurant,
  updateRestaurant,
}) => {
  const { restaurantId } = useParams();
  const history = useHistory();
  const restaurant = findRestaurant(restaurantId);

  const [formData, setFormData] = useState(initialState(restaurant));

  const onChangeHandler = (e) => {
    let { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setSwitch = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const addOption = (name, option) => {
    setFormData({
      ...formData,
      [name]: [...formData[name], option],
    });
  };

  const deleteOption = (name, index) => {
    formData[name].splice(index, 1);
    setFormData({
      ...formData,
      [name]: formData[name].length === 0 ? [] : [...formData[name]],
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    !restaurant
      ? createRestaurant(formData)
      : updateRestaurant({ ...formData, id: restaurant._id });
    history.goBack();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Prompt message="Are you sure you want to leave this page?" />
      <AppBar />
      <Form submitHandler={onSubmitHandler}>
        <TextField
          value={formData.name}
          changeHandler={onChangeHandler}
          title="Name"
          name="name"
          type="text"
          placeholder="Enter the name"
        />
        <TextField
          value={formData.image}
          changeHandler={onChangeHandler}
          title="Image URL"
          name="image"
          type="text"
          placeholder="Enter the Image URL"
        />
        <TextField
          value={formData.email}
          changeHandler={onChangeHandler}
          title="Email"
          name="email"
          type="text"
          placeholder="Enter the email"
        />
        <TextField
          value={formData.password}
          changeHandler={onChangeHandler}
          title="Password"
          name="password"
          type="text"
          placeholder="Enter the password"
        />
        <TextField
          value={formData.city}
          changeHandler={onChangeHandler}
          title="City"
          name="city"
          type="text"
          placeholder="Enter the city"
        />
        <TextField
          value={formData.lat}
          changeHandler={onChangeHandler}
          title="Latitude"
          name="lat"
          type="text"
          placeholder="Enter the latitude"
        />
        <TextField
          value={formData.long}
          changeHandler={onChangeHandler}
          title="Longitude"
          name="long"
          type="text"
          placeholder="Enter the longitude"
        />
        <OptionField
          title="Top Picks"
          name="topPicks"
          options={formData.topPicks}
          addOption={addOption}
          deleteOption={deleteOption}
          other
        />
        <TextField
          value={formData.offer}
          changeHandler={onChangeHandler}
          title="Offer"
          name="offer"
          type="text"
          placeholder="Enter the offer"
        />
        <TextField
          value={formData.from}
          changeHandler={onChangeHandler}
          title="Available From"
          name="from"
          type="text"
          placeholder="Enter in 24hrs format"
        />
        <TextField
          value={formData.to}
          changeHandler={onChangeHandler}
          title="Available To"
          name="to"
          type="text"
          placeholder="Enter in 24hrs format"
        />

        <Mui.Box
          sx={{
            padding: "0.6rem 1rem 0 1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div>Popular</div>
          <Mui.Checkbox
            size="small"
            name={"popular"}
            checked={formData.popular}
            onChange={setSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Mui.Box>
      </Form>
    </div>
  );
};

const initialState = (restaurant) => {
  return {
    name: restaurant ? restaurant.name : "",
    image: restaurant ? restaurant.image : "",
    email: restaurant ? restaurant.email : "",
    password: restaurant ? restaurant.password : "",
    city: restaurant ? restaurant.city : "",
    lat: restaurant ? `${restaurant.geoPoint.lat}` : "",
    long: restaurant ? `${restaurant.geoPoint.long}` : "",
    topPicks: restaurant ? restaurant.topPicks : "",
    popular: restaurant ? restaurant.popular : false,
    offer: restaurant ? restaurant.offer : "",
    from: restaurant ? `${restaurant.timing.from}` : "",
    to: restaurant ? `${restaurant.timing.to}` : "",
  };
};

const mapStateToProps = (state) => {
  return {
    findRestaurant: (id) => findOneById(id, state.Restaurants.restaurants),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRestaurant: (restaurantInfo) =>
      dispatch(restaurantActions.create(restaurantInfo)),
    updateRestaurant: (restaurantInfo) =>
      dispatch(restaurantActions.updateOne(restaurantInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurant);
