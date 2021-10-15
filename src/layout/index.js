import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";

import { AppDrawer, DrawerButton } from "../components/appDrawer";

import classes from "./index.module.css";

const drawerWidth = 240;

export const AppLayout = ({ children }) => {
  const [drawerToggle, setDrawerToggle] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerToggle((prev) => !prev);
  };

  return (
    <>
      <DrawerButton
        drawerToggle={drawerToggle}
        handleDrawerToggle={handleDrawerToggle}
      />
      <div className={classes.Container}>
        <AppDrawer
          drawerWidth={drawerWidth}
          drawerToggle={drawerToggle}
          handleDrawerToggle={handleDrawerToggle}
        />
        <div className={classes.Page}>{children}</div>
      </div>
    </>
  );
};
