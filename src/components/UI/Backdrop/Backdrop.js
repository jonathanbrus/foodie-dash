import React from "react";
import { motion } from "framer-motion";

import classes from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classes.Backdrop}
      onClick={(e) => {
        e.stopPropagation();
        // props.onClick();
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Backdrop;
