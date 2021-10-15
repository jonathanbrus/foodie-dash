import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export const AppDialog = ({ title, open, closeHandler, deleteHandler }) => {
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button onClick={closeHandler} autoFocus>
          Cancel
        </Button>
        <Button onClick={deleteHandler}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
