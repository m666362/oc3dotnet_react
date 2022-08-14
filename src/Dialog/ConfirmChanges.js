import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { widState } from "../Store/TableStore";
import { useSnapshot } from "valtio";

function ConfirmChanges(props) {
  const [open, setOpen] = React.useState(false);
  const snap = useSnapshot(widState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        fullWidth
        color="error"
      >
        Delete Record
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you really want to change these..
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {" Are you Sure want to change - "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              alert("Saved changes")
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmChanges;
