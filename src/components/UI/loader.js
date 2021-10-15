import React from "react";

import { CircularProgress } from "@mui/material";

export const Loader = (props) => {
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <CircularProgress />
    </div>
  );
};
