import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function MessageDialog(props) {
  const { open, onClose, title, message, onOK } = props;
  const handleConfirm = () => {
    onOK();
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="message-dialog-title"
      aria-describedby="message-dialog-description"
    >
      <DialogTitle id="message-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="message-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          终止
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  );
}
