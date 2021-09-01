import React from "react";

import classes from "./AddButton.module.css";

const AddButton = (props) => {
  const { title, onClick } = props;
  return (
    <div className={classes.AddButton} onClick={onClick}>
      {title}
    </div>
  );
};

export default AddButton;
