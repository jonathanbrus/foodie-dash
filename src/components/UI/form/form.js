import React, { useState } from "react";
import { Button } from "@mui/material";

import classes from "./form.module.css";

export const Form = ({ submitHandler, children }) => {
  return (
    <form onSubmit={submitHandler} className={classes.FormContainer}>
      {children}
      <Button
        variant="contained"
        type="submit"
        size="small"
        sx={{
          margin: "1rem",
          alignSelf: { xs: "stretch", sm: "flex-end" },
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export const TextField = ({
  value,
  changeHandler,
  title,
  name,
  type,
  placeholder,
}) => {
  return (
    <div className={classes.TextField}>
      <div>{title}</div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export const OptionField = (props) => {
  const { title, name, options, addOption, deleteOption, other } = props;

  const [optionName, setName] = useState("");
  const [price, setPrice] = useState("");

  const addOptions = () => {
    if (optionName === "" || price === "") {
      return;
    }
    setName("");
    setPrice("");
    addOption(name, { name: optionName.trim(), price: price.trim() });
  };

  const addTopPicks = () => {
    if (optionName === "") {
      return;
    }
    setName("");
    addOption(name, optionName);
  };

  return (
    <div className={classes.OptionField}>
      <div className={classes.OptionFieldTitle}>{title}</div>
      <div className={classes.OptionFieldInput}>
        <input
          name="optionName"
          type="text"
          value={optionName}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {!other && (
          <input
            name="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        )}
        <button
          type="button"
          className={classes.Add}
          onClick={other ? addTopPicks : addOptions}
        >
          Add
        </button>
      </div>
      {options && (
        <div className={classes.OptionFieldOptions}>
          {options.map((option, index) => (
            <div className={classes.Chip} key={index}>
              <div className={classes.Option}>
                {other ? (
                  option
                ) : (
                  <>
                    {option.name} &#8377;{option.price}
                  </>
                )}
              </div>
              <div
                className={classes.Delete}
                onClick={() => deleteOption(name, index)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
