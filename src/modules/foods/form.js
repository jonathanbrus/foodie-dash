import React, { useState } from "react";
import * as Mui from "@mui/material";
import { MoreVert } from "@mui/icons-material";

import { connect } from "react-redux";
import { useHistory, useParams, Prompt } from "react-router";

import { foodActions } from "../../store/actions/foods";
import { findOneById } from "../utils";
import { AppBar } from "../../components/appBar";
import { Form, TextField, OptionField } from "../../components/ui/form/form";

const FoodForm = ({ findFood, createFood, updateFood }) => {
  const { restaurantId, foodId } = useParams();
  const history = useHistory();
  const food = findFood(foodId);

  const [formData, setFormData] = useState(intitialState(food, restaurantId));
  const [addonToggle, setAddonToggle] = useState(false);
  const [toppingToggle, setToppingToggle] = useState(false);
  const [sizeToggle, setSizeToggle] = useState(false);
  const [bunToggle, setBunToggle] = useState(false);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
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
    !food ? createFood(formData) : updateFood({ ...formData, id: food._id });
    history.goBack();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Prompt message="Are you sure you want to leave this page?" />
      <AppBar>
        <Header
          addonToggle={addonToggle}
          toppingToggle={toppingToggle}
          sizeToggle={sizeToggle}
          bunToggle={bunToggle}
          setAddonToggle={setAddonToggle}
          setToppingToggle={setToppingToggle}
          setSizeToggle={setSizeToggle}
          setBunToggle={setBunToggle}
        />
      </AppBar>
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
          value={formData.category}
          changeHandler={onChangeHandler}
          title="Category"
          name="category"
          type="text"
          placeholder="Enter the category"
        />
        <TextField
          value={formData.description}
          changeHandler={onChangeHandler}
          title="Description"
          name="description"
          type="text"
          placeholder="Enter the description"
        />
        <TextField
          value={formData.packingCharge}
          changeHandler={onChangeHandler}
          title="Packaging Charge"
          name="packingCharge"
          type="text"
          placeholder="Enter the packaging charge"
        />
        <TextField
          value={formData.fixedPrice}
          changeHandler={onChangeHandler}
          title="Fixed Price"
          name="fixedPrice"
          type="text"
          placeholder="Enter the fixed price"
        />
        <TextField
          value={formData.offerPrice}
          changeHandler={onChangeHandler}
          title="Offer Price"
          name="offerPrice"
          type="text"
          placeholder="Enter the offer price"
        />
        <TextField
          value={formData.from}
          changeHandler={onChangeHandler}
          title="Available From"
          name="from"
          type="text"
          placeholder="Enter in 24hrs fromat"
        />
        <TextField
          value={formData.to}
          changeHandler={onChangeHandler}
          title="Available To"
          name="to"
          type="text"
          placeholder="Enter the in 24hrs fromat"
        />
        {addonToggle && (
          <OptionField
            title="Addons"
            name="addons"
            options={formData.addons}
            addOption={addOption}
            deleteOption={deleteOption}
          />
        )}
        {toppingToggle && (
          <OptionField
            title="Toppings"
            name="toppings"
            options={formData.toppings}
            addOption={addOption}
            deleteOption={deleteOption}
          />
        )}
        {sizeToggle && (
          <OptionField
            title="Sizes"
            name="sizes"
            options={formData.sizes}
            addOption={addOption}
            deleteOption={deleteOption}
          />
        )}
        {bunToggle && (
          <OptionField
            title="Buns"
            name="buns"
            options={formData.buns}
            addOption={addOption}
            deleteOption={deleteOption}
          />
        )}
        <Mui.Box
          sx={{
            padding: "0.6rem 1rem 0 1rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div htmlFor="veg">Vegetarian</div>
          <Mui.Checkbox
            size="small"
            name={"veg"}
            checked={formData.veg}
            onChange={setSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
          <div htmlFor="bestSeller">Best seller</div>
          <Mui.Checkbox
            size="small"
            name={"bestSeller"}
            checked={formData.bestSeller}
            onChange={setSwitch}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Mui.Box>
      </Form>
    </div>
  );
};

const Header = (props) => (
  <>
    <Mui.Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
      <Mui.FormControlLabel
        control={
          <Mui.Switch
            name={"addon"}
            checked={props.addonToggle}
            onChange={() => props.setAddonToggle((prev) => !prev)}
          />
        }
        label="Addons"
        labelPlacement="start"
      />
      <Mui.FormControlLabel
        control={
          <Mui.Switch
            name={"topping"}
            checked={props.toppingToggle}
            onChange={() => props.setToppingToggle((prev) => !prev)}
          />
        }
        label="Toppings"
        labelPlacement="start"
      />
      <Mui.FormControlLabel
        control={
          <Mui.Switch
            name={"size"}
            checked={props.sizeToggle}
            onChange={() => props.setSizeToggle((prev) => !prev)}
          />
        }
        label="Sizes"
        labelPlacement="start"
      />
      <Mui.FormControlLabel
        control={
          <Mui.Switch
            name={"bun"}
            checked={props.bunToggle}
            onChange={() => props.setBunToggle((prev) => !prev)}
          />
        }
        label="Buns"
        labelPlacement="start"
      />
    </Mui.Box>
    <Mui.IconButton sx={{ display: { xs: "block", sm: "none" } }}>
      <MoreVert />
    </Mui.IconButton>
  </>
);

const intitialState = (food, restaurantId) => {
  return {
    name: food ? food.name : "",
    image: food ? food.image : "",
    description: food ? food.description : "",
    category: food ? food.category : "",
    addons: food ? food.addons : [],
    toppings: food ? food.toppings : [],
    sizes: food ? food.sizes : [],
    buns: food ? food.buns : [],
    veg: food ? food.veg : false,
    bestSeller: food ? food.bestSeller : false,
    fixedPrice: food ? `${food.fixedPrice}` : "",
    offerPrice: food ? `${food.offerPrice}` : "",
    packingCharge: food ? `${food.packingCharge}` : "",
    from: food ? `${food.timing.from}` : "",
    to: food ? `${food.timing.to}` : "",
    restaurantId: restaurantId,
  };
};

const mapStateToProps = (state) => {
  return {
    findFood: (id) => findOneById(id, state.Foods.foods),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createFood: (foodInfo) => dispatch(foodActions.create(foodInfo)),
    updateFood: (foodInfo) => dispatch(foodActions.updateOne(foodInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm);
