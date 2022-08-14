import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "@mui/material/Modal";
import TextFieldController from "../Form/TextFieldController";
import { projectManagers, statusList } from "../utils/Data";
import AutoCompleteController from "../Form/AutoCompleteController";
import { DateTime } from "luxon";
import { useSnapshot } from "valtio";
import { widState } from "../Store/TableStore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AddRowModel({ openAddRowModal, handleClose, addRow }) {
  const snap = useSnapshot(widState);
  const { handleSubmit, control } = useForm();
  return (
    <Grid container xs={12}>
      <Modal
        open={openAddRowModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid item xs container direction="column" spacing={2} sx={style}>
          <form
            onSubmit={handleSubmit((data) => {
              data["lastUpdate"] =
                DateTime.now()
                  .setZone("America/New_York")
                  .toFormat("ccc, ff") + ` by ${snap.currentUser}`;
              data["history"] = [{...data}];
              addRow(data);
              handleClose();
            })}
          >
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography gutterBottom variant="h6" component="div">
                Add New Record
              </Typography>
            </Grid>
            <Grid item xs={12} container spacing={2} sx={{ mb: 2 }}>
              <Grid
                item
                xs={12}
                md={6}
                container
                direction="column"
                spacing={2}
              >
                {[
                  { name: "client", label: "Client", defaultValue: "client" },
                  {
                    name: "service",
                    label: "Service",
                    defaultValue: "service",
                  },
                ].map(({ name, label, defaultValue }) => (
                  <Grid item>
                    <TextFieldController
                      control={control}
                      name={name}
                      label={label}
                      defaultValue={defaultValue}
                    />
                  </Grid>
                ))}
                {[
                  { name: "status", label: "Status", options: statusList },
                  {
                    name: "projectManager",
                    label: "Project Manager",
                    options: projectManagers,
                  },
                ].map(({ name, label, options }) => (
                  <Grid item>
                    <AutoCompleteController
                      control={control}
                      name={name}
                      label={label}
                      options={options}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name="notes"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      required
                      rows={8.3}
                      size="small"
                      label="Notes"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item xs={4}>
                <Button
                  color="error"
                  size="small"
                  variant="outlined"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  fullWidth
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default AddRowModel;
