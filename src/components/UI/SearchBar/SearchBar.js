import React from "react";

import classes from "./searchBar.module.css";
import { search } from "../../../svgs";

const SearchBar = (props) => {
  const { onChange, placeholder } = props;
  return (
    <div className={classes.Search}>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className={classes.SearchIcon}>{search}</div>
    </div>
  );
};

export default SearchBar;
