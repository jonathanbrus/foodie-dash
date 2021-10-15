import React from "react";
import { useLocation } from "react-router-dom";

import { Toolbar, Typography } from "@mui/material";

export const AppBar = ({ children }) => {
  const location = useLocation();
  const pageTitle = getPageName(location.pathname);

  return (
    <div style={styles.appBar}>
      <Toolbar style={styles.toolBar}>
        <div style={styles.button}></div>
        <Typography variant="h5">{pageTitle}</Typography>
        <div style={styles.child}>
          <div style={{ flex: 1 }}></div>
          {children}
        </div>
      </Toolbar>
    </div>
  );
};

const getPageName = (pathname) => {
  if (pathname.includes("create")) {
    return "Create";
  }

  if (pathname.includes("update")) {
    return "Update";
  }

  if (pathname.includes("restaurants")) {
    return "Restaurants";
  }

  if (pathname.includes("foods")) {
    return "Foods";
  }

  if (pathname.includes("products")) {
    return "Products";
  }

  return "Orders";
};

const styles = {
  appBar: {
    position: "sticky",
    top: "0px",
    zIndex: 1,
    padding: "0.4rem",
    backgroundColor: "white",
  },
  toolBar: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: "2rem",
  },
  child: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  BasicInfo: {
    alignItems: "center",
    alignSelf: "center",
  },
  firstChild: {
    marginRight: "0.4rem",
    fontSize: "large",
  },

  lastChild: {
    fontWeight: "bolder",
    fontSize: "larger",
  },
};
