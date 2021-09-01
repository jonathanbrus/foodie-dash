import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import classes from "./DropDownSelection.module.css";

const DropDownSelection = (props) => {
  const { Items } = props;
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState(Items[0]);

  return (
    <div className={classes.DropDownSelection}>
      <div
        className={classes.Selected}
        onClick={() => setToggle((prev) => !prev)}
      >
        {selected ? selected.name : props.placeHolder}
      </div>
      <AnimatePresence>
        {toggle ? (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={classes.DropDown}
          >
            {Items.length > 0 &&
              Items.map((item) => (
                <div
                  className={classes.Item}
                  key={item.id}
                  onClick={() => {
                    setSelected(item);
                    props.setSelection(item);
                    setToggle((prev) => !prev);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default DropDownSelection;
