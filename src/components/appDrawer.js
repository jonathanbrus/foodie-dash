import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";

import { useWindowSize } from "../hooks/useWindowSize";

const useStyles = makeStyles({
  drawer: {
    zIndex: 2,
  },
});

export const AppDrawer = ({
  drawerWidth,
  drawerToggle,
  handleDrawerToggle,
}) => {
  const classes = useStyles();

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        open={drawerToggle}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <CustomDrawer handleDrawerToggle={handleDrawerToggle} />
      </Drawer>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <CustomDrawer />
      </Drawer>
    </>
  );
};

const CustomDrawer = ({ handleDrawerToggle }) => {
  const history = useHistory();
  const location = useLocation();

  const navigate = (link) => {
    if (location.pathname !== link) {
      history.push(link);
    }
  };

  const links = [
    { title: "Home", link: "/" },
    { title: "Restaurants", link: "/restaurants" },
    { title: "Products", link: "/products" },
  ];

  return (
    <>
      <Toolbar>
        <Typography variant="h5">AloFoodie</Typography>
      </Toolbar>
      <Divider />
      <List>
        {links.map((link) => (
          <ListItem disablePadding key={link.title}>
            <ListItemButton
              onClick={() => {
                navigate(link.link);
                handleDrawerToggle && handleDrawerToggle();
              }}
            >
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export const DrawerButton = ({ drawerToggle, handleDrawerToggle }) => {
  let windowSize = useWindowSize();

  return (
    windowSize.width < 600 &&
    !drawerToggle && (
      <div
        style={{
          zIndex: 2,
          position: "fixed",
          top: "0.88rem",
          left: "0.52rem",
          paddingLeft: "0.76rem",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </div>
    )
  );
};
