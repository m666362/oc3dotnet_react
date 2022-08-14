import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "@mui/material/Modal";
import TextFieldController from "../Form/TextFieldController";
import { projectManagers, statusList } from "../utils/Data";
import AutoCompleteController from "../Form/AutoCompleteController";
import { useSnapshot } from "valtio";
import { widState } from "../Store/TableStore";
import { DateTime } from "luxon";


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

function ChangeStatusModel() {
  const snap = useSnapshot(widState);
  const { handleSubmit, control } = useForm();
  return (
    <Grid container xs={12}>
      <Modal
        open={snap?.updateStatus}
        onClose={() => {
          widState.setUpdateStatus(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid item xs container direction="column" spacing={2} sx={style}>
          <form
            onSubmit={handleSubmit((data) => {
              // console.log({data});
              data = {
                ...widState.row,
                notes: data[widState.row.notes],
                status: data[widState.row.status],
                lastUpdate: DateTime.now().setZone("America/New_York").toFormat("ccc, ff") + ` by ${snap.currentUser}`,
              }
              delete data?.history;
              console.log({data});
              widState.updateRow(data);
              // widState.setRow({});
              widState.setUpdateStatus(false)
              // updateRow(data);
              // handleClose();
            })}
          >
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography gutterBottom variant="h6" component="div">
                Change of Status
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
                <Grid item>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {snap.row.client}
                  </Typography>

                  <Typography gutterBottom variant="subtitle2" component="div">
                    {snap.row.service}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography gutterBottom variant="body1" component="div">
                    Old Status: <strong>{widState.row.status}</strong>
                  </Typography>
                </Grid>
                <Grid item>
                  <AutoCompleteController
                    control={control}
                    name={widState.row.status}
                    label={"New Status"}
                    defaultValue={widState.row.status}
                    options={statusList}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  control={control}
                  name={widState.row.notes}
                  defaultValue={widState.row.notes}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      required
                      rows={6.4}
                      size="small"
                      label="Notes"
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={4}>
                <Button size="small" variant="outlined" color="error" fullWidth onClick={()=>{
                  widState.setUpdateStatus(false);
                }}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  fullWidth
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default ChangeStatusModel;
