import React from "react";

import classes from "./searchBar.module.css";

const SearchBar = ({ value, setValue, placeholder }) => {
  return (
    <div className={classes.Search}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
